# Vercel Deployment Checklist

Follow these steps to deploy your RAAV e-commerce site to Vercel.

## ✅ Pre-Deployment Checklist

- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] Environment variables are ready
- [ ] Vercel account is set up
- [ ] Root directory is configured correctly

## 🚀 Deployment Steps

### Step 1: Update Vercel Root Directory

1. Go to: https://vercel.com/sidhant-jains-projects/raav/settings
2. Scroll to **"Root Directory"**
3. Set it to: `.` (dot) or leave it **blank/empty**
4. Click **"Save"**

### Step 2: Add Environment Variables

Go to: **Settings → Environment Variables**

Add these variables for **Production**, **Preview**, and **Development**:

#### Sanity Configuration
```
NEXT_PUBLIC_SANITY_PROJECT_ID = nn84nakp
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2026-01-06
```

#### Razorpay Configuration
```
NEXT_PUBLIC_RAZORPAY_KEY_ID = your_razorpay_key_id
RAZORPAY_KEY_ID = your_razorpay_key_id
RAZORPAY_KEY_SECRET = your_razorpay_key_secret
```

**Important:**
- Make sure to add them to all three environments (Production, Preview, Development)
- `RAZORPAY_KEY_SECRET` should NOT have `NEXT_PUBLIC_` prefix (server-side only)

### Step 3: Commit and Push Your Code

```bash
# Make sure you're in the repository root
cd /Users/sidhantjain/Documents/Personal/raav-frontend

# Check what needs to be committed
git status

# Add all changes
git add .

# Commit
git commit -m "Ready for Vercel deployment - moved to root directory"

# Push to your branch
git push origin feature/ecom
```

### Step 4: Deploy

#### Option A: Automatic Deployment (Recommended)
- Vercel will automatically deploy when you push to your connected branch
- Go to your Vercel dashboard to see the deployment progress

#### Option B: Manual Deployment via Dashboard
1. Go to your Vercel project dashboard
2. Click **"Deployments"** tab
3. Click **"Redeploy"** on the latest deployment
4. Or click **"Deploy"** button

#### Option C: Deploy via CLI
```bash
# Make sure you're logged in
vercel login

# Deploy to production
vercel --prod
```

### Step 5: Verify Deployment

1. **Check Build Logs**
   - Go to your deployment in Vercel dashboard
   - Check that build completed successfully
   - Look for any errors or warnings

2. **Test Your Site**
   - Visit your deployment URL: `https://raav-*.vercel.app`
   - Test homepage
   - Test shop page
   - Test product pages
   - Test cart functionality
   - Test checkout (use Razorpay test mode)

3. **Check Environment Variables**
   - Go to Settings → Environment Variables
   - Verify all variables are set
   - Make sure they're added to Production environment

## 🔧 Post-Deployment

### 1. Set Up Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain (e.g., `raav.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

### 2. Configure Sanity CORS (If Needed)

If you get CORS errors when fetching content:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to **Settings → API → CORS origins**
4. Add your Vercel domain: `https://your-app.vercel.app`
5. Or add wildcard: `https://*.vercel.app`

### 3. Configure Razorpay Webhooks (Optional)

If you want to handle payment webhooks:

1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL: `https://your-app.vercel.app/api/razorpay-webhook`
3. Select events: `payment.captured`, `payment.failed`

### 4. Test Everything

- [ ] Homepage loads correctly
- [ ] Products display from Sanity
- [ ] Shop page filters work
- [ ] Product detail pages work
- [ ] Cart functionality works
- [ ] Checkout form works
- [ ] Payment integration works (test mode)

## 🐛 Troubleshooting

### Build Fails

**Error: Missing environment variable**
- Solution: Add all required environment variables in Vercel dashboard
- Make sure they're added to Production environment

**Error: Root directory not found**
- Solution: Set Root Directory to `.` or blank in Vercel settings

**Error: Module not found**
- Solution: Ensure `package.json` is in the root directory
- Run `npm install` locally to verify dependencies

### Runtime Errors

**Sanity content not loading**
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
- Verify Sanity CORS settings
- Check browser console for errors

**Razorpay not working**
- Verify Razorpay keys are correct
- Check that keys match environment (test vs production)
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set for client-side
- Verify `RAZORPAY_KEY_SECRET` is set for server-side

**Images not loading**
- Check Sanity image URLs
- Verify Sanity CORS settings allow your Vercel domain

## 📝 Quick Reference

| Task | Command/URL |
|------|------------|
| Vercel Dashboard | https://vercel.com/dashboard |
| Project Settings | https://vercel.com/sidhant-jains-projects/raav/settings |
| Deploy via CLI | `vercel --prod` |
| View Logs | Vercel Dashboard → Deployments → Click deployment |

## ✅ Success Criteria

Your deployment is successful when:
- ✅ Build completes without errors
- ✅ Site is accessible at Vercel URL
- ✅ All pages load correctly
- ✅ Products display from Sanity
- ✅ Cart and checkout work
- ✅ No console errors in browser

## 🎉 Next Steps After Deployment

1. Test the full user journey
2. Add real products via Sanity Studio
3. Set up custom domain
4. Configure analytics (optional)
5. Set up monitoring (optional)

