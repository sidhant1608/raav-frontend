# Deploying RAAV E-Commerce to Vercel

This guide will walk you through deploying your Next.js e-commerce application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Sanity project ID and dataset
- Razorpay keys (for payment functionality)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push Your Code to Git

Make sure your code is in a Git repository:

```bash
# If not already initialized
git init
git add .
git commit -m "Initial commit"

# Push to GitHub/GitLab/Bitbucket
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository:
   - Connect your Git provider (GitHub/GitLab/Bitbucket) if not already connected
   - Select your repository (`raav-ecommerce`)
   - Click **"Import"**

### Step 3: Configure Project Settings

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (or `raav-ecommerce` if your repo root is different)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Step 4: Add Environment Variables

**Before deploying, add all required environment variables:**

Click **"Environment Variables"** and add:

#### Sanity Configuration
```
NEXT_PUBLIC_SANITY_PROJECT_ID=nn84nakp
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-06
```

#### Razorpay Configuration
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**Important Notes:**
- `NEXT_PUBLIC_*` variables are exposed to the browser
- `RAZORPAY_KEY_SECRET` should NOT have `NEXT_PUBLIC_` prefix (server-side only)
- Add these for all environments: Production, Preview, and Development

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll get a URL like: `raav-ecommerce.vercel.app`

### Step 6: Custom Domain (Optional)

1. Go to your project settings
2. Click **"Domains"**
3. Add your custom domain (e.g., `raav.com`)
4. Follow DNS configuration instructions

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project directory:

```bash
cd raav-ecommerce
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No** (first time) or **Yes** (if redeploying)
- Project name? `raav-ecommerce` (or your preferred name)
- Directory? `./` (current directory)
- Override settings? **No**

### Step 4: Add Environment Variables via CLI

```bash
# Add environment variables
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# Enter value: nn84nakp
# Select environments: Production, Preview, Development

vercel env add NEXT_PUBLIC_SANITY_DATASET
# Enter value: production

vercel env add NEXT_PUBLIC_SANITY_API_VERSION
# Enter value: 2026-01-06

vercel env add NEXT_PUBLIC_RAZORPAY_KEY_ID
# Enter your Razorpay key ID

vercel env add RAZORPAY_KEY_ID
# Enter your Razorpay key ID

vercel env add RAZORPAY_KEY_SECRET
# Enter your Razorpay key secret
```

### Step 5: Deploy to Production

```bash
vercel --prod
```

## Post-Deployment Checklist

### ✅ Verify Deployment

1. **Check Build Logs**
   - Go to your Vercel project dashboard
   - Check the "Deployments" tab
   - Ensure build completed successfully

2. **Test Your Site**
   - Visit your deployment URL
   - Test homepage: `https://your-app.vercel.app`
   - Test shop page: `https://your-app.vercel.app/shop`
   - Test product pages
   - Test cart functionality

3. **Check Environment Variables**
   - Go to Settings → Environment Variables
   - Verify all variables are set correctly
   - Make sure they're added to Production environment

### ✅ Sanity Studio Access

Your Sanity Studio is deployed separately at:
- **Studio URL**: https://raav.sanity.studio/

This is independent of your Vercel deployment.

### ✅ Razorpay Configuration

1. **Update Razorpay Webhook** (if using):
   - Go to Razorpay Dashboard → Settings → Webhooks
   - Add webhook URL: `https://your-app.vercel.app/api/razorpay-webhook`
   - Select events: `payment.captured`, `payment.failed`

2. **Update CORS Settings**:
   - In Razorpay Dashboard → Settings → API Keys
   - Add your Vercel domain to allowed origins

## Troubleshooting

### Build Fails

**Error: Missing environment variable**
- Solution: Add all required environment variables in Vercel dashboard
- Make sure to add them for the correct environment (Production/Preview/Development)

**Error: Module not found**
- Solution: Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: TypeScript errors**
- Solution: Fix TypeScript errors locally first
- Run `npm run build` locally to catch errors before deploying

### Runtime Errors

**Sanity connection issues**
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are correct
- Verify Sanity project is accessible
- Check Sanity CORS settings if needed

**Razorpay not working**
- Verify Razorpay keys are correct
- Check that `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set (for client-side)
- Check that `RAZORPAY_KEY_SECRET` is set (for server-side API routes)
- Ensure Razorpay keys match the environment (test vs production)

**Images not loading**
- Check Sanity image URLs are accessible
- Verify Sanity project CORS settings allow your Vercel domain

### Performance Issues

**Slow page loads**
- Enable Vercel Analytics to monitor performance
- Check image optimization settings
- Consider enabling ISR (Incremental Static Regeneration) for product pages

## Continuous Deployment

Vercel automatically deploys on every push to your main branch:

1. **Automatic Deployments**: Every push to `main` triggers a production deployment
2. **Preview Deployments**: Pull requests get preview URLs automatically
3. **Branch Deployments**: Other branches get preview deployments

## Environment-Specific Deployments

You can have different environment variables for:
- **Production**: Your live site
- **Preview**: Pull requests and branches
- **Development**: Local development (via Vercel CLI)

Set different values for each environment in Vercel dashboard.

## Monitoring & Analytics

1. **Vercel Analytics** (optional):
   - Go to your project → Analytics
   - Enable Web Analytics for free
   - Monitor page views and performance

2. **Error Tracking**:
   - Check Vercel Function Logs for API route errors
   - Monitor deployment logs for build issues

## Next Steps After Deployment

1. ✅ Test all functionality (browsing, cart, checkout)
2. ✅ Set up custom domain
3. ✅ Configure Razorpay webhooks (if needed)
4. ✅ Add content via Sanity Studio
5. ✅ Set up monitoring/analytics
6. ✅ Configure CORS in Sanity (if needed)

## Quick Reference

**Deploy Command:**
```bash
vercel --prod
```

**View Logs:**
```bash
vercel logs
```

**List Deployments:**
```bash
vercel ls
```

**Remove Deployment:**
```bash
vercel remove
```

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Support: https://vercel.com/support

