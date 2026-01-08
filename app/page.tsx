import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { homepageQuery, featuredProductsQuery } from '@/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import ProductCard from '@/components/ProductCard'
import { PortableText } from '@portabletext/react'
import type { Product } from '@/types/product'

async function getHomepageData() {
  try {
    // Log environment check (only in development or when debugging)
    if (process.env.NODE_ENV === 'development') {
      console.log('Sanity Config:', {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET',
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT SET',
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || 'NOT SET',
      })
    }
    
    const homepage = await client.fetch(homepageQuery)
    const featuredProducts = await client.fetch(featuredProductsQuery)
    
    // Log results for debugging
    console.log('Fetched featured products:', featuredProducts?.length || 0)
    
    return { homepage, featuredProducts }
  } catch (error) {
    // Enhanced error logging
    console.error('Error fetching homepage data:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    // Check if it's an environment variable issue
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      console.error('⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID is not set!')
    }
    if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
      console.error('⚠️ NEXT_PUBLIC_SANITY_DATASET is not set!')
    }
    
    // Return empty data if fetch fails (e.g., missing env vars or network issue)
    return { homepage: null, featuredProducts: [] }
  }
}

export default async function Home() {
  const { homepage, featuredProducts } = await getHomepageData()

  const heroImage = homepage?.heroImages?.[0]
  const heroImageUrl = heroImage
    ? urlForImage(heroImage).width(1920).height(1080).url()
    : null

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt="RAAV Collection"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700" />
        )}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            {homepage?.heroTitle || 'RAAV'}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {homepage?.heroSubtitle || 'Discover timeless fashion that speaks to your style'}
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium fashion pieces
            </p>
          </div>
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured products available yet.</p>
              {process.env.NODE_ENV === 'development' && (
                <p className="text-xs text-gray-400 mt-2">
                  Check console for debugging information
                </p>
              )}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Brand Snippet */}
      {homepage?.aboutSnippet && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
              About RAAV
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <PortableText value={homepage.aboutSnippet} />
            </div>
            <div className="text-center mt-8">
              <Link
                href="/about"
                className="inline-block text-gray-900 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
