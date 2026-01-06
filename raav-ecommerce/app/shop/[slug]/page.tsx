import { notFound } from 'next/navigation'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { productBySlugQuery } from '@/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import ProductDetailClient from '@/components/ProductDetailClient'
import type { Product } from '@/types/product'

async function getProduct(slug: string): Promise<Product | null> {
  const product = await client.fetch<Product | null>(productBySlugQuery, { slug })
  return product
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

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

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const images = product.images || []

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {images.length > 0 ? (
              <>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={urlForImage(images[0]).width(800).height(1000).url()}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.slice(1, 5).map((image, index) => (
                      <div
                        key={image._key || index}
                        className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                      >
                        <Image
                          src={urlForImage(image).width(200).height(200).url()}
                          alt={`${product.name} ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>

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

