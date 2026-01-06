'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]
  const imageUrl = mainImage ? urlForImage(mainImage).width(600).height(800).url() : '/placeholder.jpg'

  return (
    <Link
      href={`/shop/${product.slug.current}`}
      className="group block transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {mainImage ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 mt-1">₹{product.price.toLocaleString()}</p>
      </div>
    </Link>
  )
}

