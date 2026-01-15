'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

type SanityImage = {
  _key?: string
  asset?: {
    _ref?: string
  }
}

interface ProductGalleryProps {
  images: SanityImage[]
  name: string
}

export default function ProductGallery({ images = [], name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">No Image Available</span>
      </div>
    )
  }

  const activeImage = images[activeIndex]

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const imageUrl =
    activeImage && (activeImage as any).asset
      ? urlForImage(activeImage).width(1200).height(1500).url()
      : undefined

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.slice(0, 10).map((image, index) => {
            const thumbUrl =
              image && (image as any).asset
                ? urlForImage(image).width(200).height(200).url()
                : undefined
            const isActive = index === activeIndex
            return (
              <button
                key={image._key || index}
                onClick={() => setActiveIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border ${
                  isActive ? 'border-gray-900' : 'border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-gray-900`}
                aria-label={`View image ${index + 1}`}
              >
                {thumbUrl ? (
                  <Image
                    src={thumbUrl}
                    alt={`${name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
                {isActive && <div className="absolute inset-0 ring-2 ring-gray-900 rounded-lg" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

