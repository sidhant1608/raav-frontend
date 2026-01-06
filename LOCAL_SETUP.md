# Local Development Setup Guide

This guide will help you set up and run the RAAV e-commerce website locally.

## Prerequisites

- Node.js 20.9.0 or higher
- npm (comes with Node.js)
- A Sanity.io account
- (Optional) Razorpay account for testing payments

## Step 1: Install Dependencies

```bash
cd raav-ecommerce
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-06

# Razorpay Configuration (for testing payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**To get your Sanity credentials:**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (or create a new one)
3. Copy the Project ID
4. Your dataset is usually `production` (or `development` for testing)

## Step 3: Run the Development Server

```bash
npm run dev
```

The app will be available at:
- **Main App**: http://localhost:3000
- **Sanity Studio (Embedded)**: http://localhost:3000/studio

## Step 4: Access Sanity Studio

### Option A: Embedded Studio (Recommended for Development)
1. Open http://localhost:3000/studio
2. Log in with your Sanity account
3. Start adding content!

### Option B: Standalone Studio
If you want to use the standalone studio locally:

```bash
# Make sure your .env.local has the Sanity variables
# Then run the studio directly
npx sanity dev
```

## Step 5: Add Content

### Create Categories
1. Go to Studio → Categories
2. Click "Create new"
3. Add name, slug, and description
4. Save

### Add Products
1. Go to Studio → Products
2. Click "Create new"
3. Fill in:
   - Product Name
   - Slug (auto-generated from name)
   - Description
   - Price (in INR)
   - Images (upload multiple)
   - Available Sizes (XS, S, M, L, XL, XXL)
   - Category (select from created categories)
   - In Stock (toggle)
   - Featured (toggle for homepage)
4. Save

### Set Up Homepage
1. Go to Studio → Homepage
2. Add:
   - Hero Images
   - Hero Title
   - Hero Subtitle
   - Featured Products (select products)
   - About Brand Snippet
3. Save

## Step 6: Test the E-Commerce Flow

1. **Browse Products**: http://localhost:3000/shop
   - Test filters (category, price)
   - Test search
   - Test sorting

2. **View Product Details**: Click on any product
   - Test size selection
   - Test quantity selector
   - Test "Add to Cart"

3. **Shopping Cart**: http://localhost:3000/cart
   - Verify items appear
   - Test quantity adjustment
   - Test item removal
   - Check price calculations

4. **Checkout**: http://localhost:3000/checkout
   - Fill in shipping form
   - Test form validation
   - (Note: Razorpay will work in test mode with test keys)

## Testing Payment Integration

For testing payments locally:

1. **Get Razorpay Test Keys**:
   - Sign up at [razorpay.com](https://razorpay.com)
   - Go to Settings → API Keys
   - Generate test keys

2. **Add to `.env.local`**:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=...
   ```

3. **Test Payment Flow**:
   - Add items to cart
   - Go to checkout
   - Fill in shipping details
   - Click "Pay"
   - Use Razorpay test card: `4111 1111 1111 1111`
   - Use any future expiry date and any CVV

## Common Issues

### "Missing environment variable" Error
- Make sure `.env.local` exists in the root directory
- Restart the dev server after adding/changing env variables
- Check that variable names match exactly (case-sensitive)

### Sanity Studio Not Loading
- Verify your Sanity project ID and dataset are correct
- Make sure you're logged into the correct Sanity account
- Check browser console for errors

### Images Not Showing
- Make sure images are uploaded in Sanity Studio
- Check that image URLs are accessible
- Verify Sanity project has proper CORS settings

### Payment Not Working
- Verify Razorpay keys are correct
- Make sure you're using test keys for local development
- Check browser console and server logs for errors

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Deploy Sanity Studio to sanity.studio
npm run deploy:studio
```

## Next Steps

1. **Add Real Content**: Use Sanity Studio to add products, categories, and homepage content
2. **Customize Design**: Modify components in `/components` and styles in `app/globals.css`
3. **Test Everything**: Go through the entire shopping flow
4. **Deploy**: When ready, deploy to Vercel or your preferred hosting

## Getting Help

- Check the [README.md](./README.md) for more details
- Sanity Docs: https://www.sanity.io/docs
- Next.js Docs: https://nextjs.org/docs
- Razorpay Docs: https://razorpay.com/docs

