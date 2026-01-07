import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { productBySlugQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import ProductDetailClient from '@/components/ProductDetailClient'
import ProductGallery from '@/components/ProductGallery'
import type { Product } from '@/types/product'

async function getProduct(slug: string): Promise<Product | null> {
  const product = await client.fetch<Product | null>(productBySlugQuery, { slug })
  return product
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | RAAV`,
    description: product.description?.[0]?.children?.[0]?.text || product.name,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const images = product.images || []

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <ProductGallery images={images} name={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-3xl text-gray-700">₹{product.price.toLocaleString()}</p>
            </div>

            {product.description && (
              <div className="prose max-w-none">
                <PortableText value={product.description} />
              </div>
            )}

            <ProductDetailClient product={product} />

            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-2">Category</h3>
              <p className="text-gray-600">{product.category?.name || 'Uncategorized'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

