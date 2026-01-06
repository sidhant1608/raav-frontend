# RAAV E-Commerce Website

A modern, full-featured e-commerce website for the RAAV fashion brand built with Next.js 14, TypeScript, Tailwind CSS, and Sanity.io.

## Features

- 🛍️ **Product Catalog** - Browse products with filtering and sorting
- 🛒 **Shopping Cart** - Persistent cart with Zustand state management
- 💳 **Payment Integration** - Razorpay payment gateway integration
- 📱 **Responsive Design** - Mobile-first, fully responsive layout
- 🎨 **Modern UI** - Clean, minimal, fashion-forward design
- 📝 **Content Management** - Sanity.io headless CMS for easy content management
- 🔍 **SEO Optimized** - Proper metadata and SEO-friendly structure
- ⚡ **Performance** - Optimized images and fast page loads

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io v3
- **Payment**: Razorpay
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm, yarn, pnpm, or bun
- Sanity.io account
- Razorpay account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd raav-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-06

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. Set up Sanity:
- Create a new Sanity project at [sanity.io](https://www.sanity.io)
- Get your project ID and dataset name
- Update the environment variables
- The schemas are already configured in `/sanity/schemaTypes`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

7. Access Sanity Studio:
Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to manage your content

## Project Structure

```
raav-ecommerce/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes (Razorpay, contact)
│   ├── shop/              # Shop and product pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── studio/            # Sanity Studio
├── components/            # Reusable React components
├── lib/                   # Utilities and helpers
├── sanity/                # Sanity configuration and schemas
│   ├── schemaTypes/       # Content schemas
│   └── lib/               # Sanity utilities
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Sanity Schemas

The project includes the following Sanity schemas:

- **Product**: Products with images, prices, sizes, categories
- **Category**: Product categories
- **Homepage**: Homepage content and featured products
- **Page**: Static pages (About, Contact, etc.)

## Features in Detail

### Shopping Cart
- Persistent cart using Zustand with localStorage
- Add/remove items
- Quantity adjustment
- Size selection per product

### Product Filtering
- Filter by category
- Filter by price range
- Search by product name
- Sort by price, name, or date

### Payment Integration
- Razorpay integration for secure payments
- Payment verification
- Order confirmation

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Sanity Studio Deployment

The Sanity Studio is embedded in the Next.js app at `/studio`. When you deploy your Next.js app (e.g., to Vercel), the studio will automatically be available at `yourdomain.com/studio`.

**Option 1: Embedded Studio (Recommended)**
- Just deploy your Next.js app - the studio comes with it
- Access it at `yourdomain.com/studio`
- No separate deployment needed

**Option 2: Standalone Studio Deployment**
If you want to deploy the studio separately to `raav.sanity.studio`:

```bash
npm run deploy:studio
```

This script will:
1. Temporarily switch to the standalone studio config
2. Deploy to Sanity's hosted service
3. Restore the embedded config

**Note:** The embedded studio config (`sanity.config.ts`) uses `'use client'` for Next.js, while the standalone config (`sanity.config.standalone.ts`) is for deployment to sanity.studio.

## Environment Variables

Make sure to set up all required environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity dataset name
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Razorpay public key
- `RAZORPAY_KEY_ID`: Razorpay key ID (server-side)
- `RAZORPAY_KEY_SECRET`: Razorpay key secret (server-side)

## License

This project is private and proprietary.

## Support

For support, email info@raav.com or open an issue in the repository.
