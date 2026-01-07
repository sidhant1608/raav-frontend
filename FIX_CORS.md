# Fix CORS Error for Sanity

You're getting a CORS error because Sanity needs to allow requests from your Vercel domain.

## Quick Fix

### Step 1: Get Your Vercel Domain

Your Vercel deployment URL is:
```
https://raav-feu5oswrc-sidhant-jains-projects.vercel.app
```

Or if you have a custom domain, use that instead.

### Step 2: Add CORS Origin in Sanity

1. Go to: https://www.sanity.io/manage
2. Select your project (the one with ID: `nn84nakp`)
3. Go to: **Settings** → **API** → **CORS origins**
4. Click **"Add CORS origin"**
5. Add your Vercel domain:
   ```
   https://raav-feu5oswrc-sidhant-jains-projects.vercel.app
   ```
6. **Enable** these options:
   - ✅ **Allow credentials** (required for authenticated requests)
7. Click **"Save"**

### Step 3: Add Wildcard (Recommended)

For easier management, you can also add a wildcard pattern that covers all Vercel deployments:

```
https://*.vercel.app
```

This will allow:
- Production deployments
- Preview deployments (from PRs)
- Any future deployments

**Enable credentials** for this as well.

### Step 4: Verify

After adding the CORS origin:
1. Wait 1-2 minutes for changes to propagate
2. Refresh your Vercel site
3. The CORS error should be gone

## Alternative: Use Sanity CDN with Token (If Needed)

If you still have issues, you might need to configure the Sanity client to use a token. But for public datasets, CORS should be sufficient.

## Current Sanity Client Configuration

Your current setup uses:
- Project ID: `nn84nakp`
- Dataset: `production`
- CDN: Enabled (for faster responses)

The CORS fix above should resolve the issue.

