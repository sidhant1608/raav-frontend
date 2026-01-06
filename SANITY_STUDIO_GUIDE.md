# Sanity Studio Deployment & Testing Guide

This guide covers how to deploy and test your Sanity Studio.

## Quick Start

### Deploy Studio
```bash
npm run deploy:studio
```

### Test Locally
```bash
npx sanity dev
```

## Detailed Instructions

### 1. Deploy to Sanity Studio (sanity.studio)

#### Method 1: Using the Script (Recommended)
```bash
npm run deploy:studio
```

This will:
- Deploy your studio to https://raav.sanity.studio/
- Use the configuration from `sanity.config.ts`
- Automatically use your project ID and dataset

#### Method 2: Direct Deployment
```bash
npx sanity deploy
```

When prompted:
- **Studio hostname**: `raav` (or your preferred name)
- The studio will be available at: `https://raav.sanity.studio/`

### 2. Test Studio Locally

#### Start Local Development Server
```bash
npx sanity dev
```

This will:
- Start the studio at http://localhost:3333
- Watch for changes and hot-reload
- Use your local `.env.local` for configuration

#### Access Local Studio
Open your browser and go to: **http://localhost:3333**

### 3. Verify Configuration

Make sure your `.env.local` has:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=nn84nakp
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-06
```

### 4. Test the Deployed Studio

1. **Go to**: https://raav.sanity.studio/
2. **Log in** with your Sanity account
3. **Verify you can see**:
   - Products
   - Categories
   - Homepage
   - Pages

### 5. Add Content

#### Create a Category
1. Click **"Categories"** in the sidebar
2. Click **"Create new"**
3. Fill in:
   - **Name**: e.g., "T-Shirts"
   - **Slug**: Auto-generated from name
   - **Description**: Optional
4. Click **"Publish"**

#### Add a Product
1. Click **"Products"** in the sidebar
2. Click **"Create new"**
3. Fill in:
   - **Product Name**: e.g., "Classic White T-Shirt"
   - **Slug**: Auto-generated
   - **Description**: Product description
   - **Price**: e.g., 1999 (in INR, so ₹1,999)
   - **Images**: Upload product images
   - **Available Sizes**: Select sizes (XS, S, M, L, XL, XXL)
   - **Category**: Select the category you created
   - **In Stock**: Toggle ON
   - **Featured Product**: Toggle ON if you want it on homepage
4. Click **"Publish"**

#### Set Up Homepage
1. Click **"Homepage"** in the sidebar
2. Add:
   - **Hero Images**: Upload hero banner images
   - **Hero Title**: e.g., "Welcome to RAAV"
   - **Hero Subtitle**: e.g., "Discover timeless fashion"
   - **Featured Products**: Select products to feature
   - **About Brand Snippet**: Add your brand story
3. Click **"Publish"**

### 6. Verify Content Appears on Your Site

After adding content in Sanity Studio:

1. **Check your Next.js app** (local or deployed):
   - Homepage should show featured products
   - Shop page should list all products
   - Product detail pages should display correctly

2. **If content doesn't appear**:
   - Wait a few seconds (Sanity CDN cache)
   - Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)
   - Check browser console for errors
   - Verify environment variables are set correctly

### 7. Troubleshooting

#### Studio Won't Deploy
- **Error: Missing project ID**
  - Check `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - Or verify `sanity.config.ts` has the fallback project ID

- **Error: Authentication failed**
  - Run `npx sanity login` to authenticate
  - Make sure you're logged into the correct Sanity account

#### Local Studio Won't Start
- **Error: Cannot find module**
  - Run `npm install` to ensure dependencies are installed
  - Check Node.js version (should be 20.9+ or 22.12+)

- **Error: Port already in use**
  - Kill the process using port 3333
  - Or use: `npx sanity dev --port 3334`

#### Content Not Showing on Website
- **Check environment variables**:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` must match your Sanity project
  - `NEXT_PUBLIC_SANITY_DATASET` must match your dataset name

- **Check Sanity CORS settings**:
  - Go to https://www.sanity.io/manage
  - Select your project
  - Go to Settings → API → CORS origins
  - Add your domain (e.g., `https://your-app.vercel.app`)

- **Verify content is published**:
  - In Sanity Studio, make sure documents are "Published" not just "Draft"

### 8. Useful Commands

```bash
# Deploy studio
npm run deploy:studio

# Run studio locally
npx sanity dev

# Login to Sanity
npx sanity login

# Check Sanity project info
npx sanity projects list

# View studio logs
npx sanity logs
```

### 9. Studio URLs

- **Deployed Studio**: https://raav.sanity.studio/
- **Local Studio**: http://localhost:3333 (when running `npx sanity dev`)

### 10. Next Steps

1. ✅ Deploy studio: `npm run deploy:studio`
2. ✅ Test locally: `npx sanity dev`
3. ✅ Add categories and products
4. ✅ Set up homepage content
5. ✅ Verify content appears on your Next.js site
6. ✅ Test the full e-commerce flow

## Quick Reference

| Task | Command |
|------|---------|
| Deploy studio | `npm run deploy:studio` |
| Run locally | `npx sanity dev` |
| Login | `npx sanity login` |
| List projects | `npx sanity projects list` |

## Support

- Sanity Docs: https://www.sanity.io/docs
- Sanity Studio: https://www.sanity.io/docs/studio
- Sanity CLI: https://www.sanity.io/docs/cli

