# Debugging Featured Products in Deployment

If your featured products work locally but not in deployment, follow these steps:

## 🔍 Step 1: Check Environment Variables in Vercel

**Most Common Issue**: Missing or incorrect environment variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Verify these variables are set for **Production** environment:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=nn84nakp
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-06
```

**Important:**
- Make sure they're added to **Production** (not just Preview/Development)
- No spaces around the `=` sign
- Values match exactly what you use locally

## 🔍 Step 2: Check Vercel Build Logs

1. Go to your Vercel project → **Deployments** tab
2. Click on the latest deployment
3. Check the **Build Logs** for any errors
4. Look for:
   - Environment variable warnings
   - Sanity connection errors
   - Network timeouts

## 🔍 Step 3: Check Runtime Logs

1. In Vercel dashboard, go to **Deployments** → Click your deployment
2. Click **Functions** tab
3. Look for server-side logs that show:
   - "Fetched featured products: X" (should be > 0)
   - Any error messages about Sanity connection

## 🔍 Step 4: Verify Sanity Project Access

1. Go to https://www.sanity.io/manage
2. Select your project (ID: `nn84nakp`)
3. Verify:
   - Project is active
   - Dataset `production` exists
   - You have products with `featured: true`

## 🔍 Step 5: Check Sanity CORS Settings

If you see CORS errors:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to **Settings → API → CORS origins**
4. Add your Vercel domain: `https://your-app.vercel.app`
5. Or add wildcard: `https://*.vercel.app`

## 🔍 Step 6: Test Sanity Query Directly

Test if your Sanity project is accessible:

```bash
# Install Sanity CLI if needed
npm install -g @sanity/cli

# Test query
sanity exec 'client.fetch("*[_type == \"product\" && featured == true]")' --with-user-token
```

## 🔧 Quick Fixes

### Fix 1: Redeploy After Adding Environment Variables

After adding/updating environment variables:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Select **"Use existing Build Cache"** = OFF (to ensure env vars are picked up)

### Fix 2: Clear CDN Cache

The code now disables CDN in production, but if you still see cached data:
1. Redeploy your application
2. Or wait for CDN cache to expire (usually 24 hours)

### Fix 3: Verify Product Data

Make sure you have products marked as featured in Sanity:
1. Go to https://raav.sanity.studio/
2. Open a product
3. Check the **"Featured"** checkbox
4. Save and publish

## 🐛 Common Error Messages

### "No featured products available yet"
- **Cause**: Query returned empty array
- **Check**: 
  - Do you have products with `featured: true`?
  - Are environment variables set correctly?
  - Check Vercel function logs for errors

### "Error fetching homepage data"
- **Cause**: Sanity connection failed
- **Check**:
  - Environment variables in Vercel
  - Sanity project ID and dataset are correct
  - Network connectivity from Vercel to Sanity

### Products show locally but not in deployment
- **Cause**: Environment variables not set in Vercel
- **Fix**: Add all `NEXT_PUBLIC_SANITY_*` variables to Vercel Production environment

## 📋 Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are set in Vercel (Production)
- [ ] Sanity project is accessible
- [ ] You have products with `featured: true` in Sanity
- [ ] Build completes successfully
- [ ] No errors in Vercel function logs
- [ ] Test the deployed site after deployment

## 🚀 After Fixing

1. **Redeploy** your application
2. **Wait** for build to complete (2-5 minutes)
3. **Test** the homepage on your deployed URL
4. **Check** browser console for any client-side errors
5. **Check** Vercel function logs for server-side errors

## 💡 Still Not Working?

If none of the above fixes work:

1. **Check Vercel Function Logs**:
   - Go to Deployments → Your deployment → Functions
   - Look for detailed error messages
   - The improved error logging will show what's wrong

2. **Compare Local vs Production**:
   - Run `npm run build` locally
   - Check if build succeeds
   - Compare `.env.local` with Vercel environment variables

3. **Test Sanity Connection**:
   ```bash
   # Create a test API route to debug
   # app/api/test-sanity/route.ts
   ```

4. **Contact Support**:
   - Vercel Support: https://vercel.com/support
   - Sanity Support: https://www.sanity.io/help
