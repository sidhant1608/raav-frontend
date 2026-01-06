'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { Plus, Minus, ShoppingBag } from 'lucide-react'
import type { Product } from '@/types/product'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '')
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    addItem(product, selectedSize, quantity)
    alert('Product added to cart!')
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  if (!product.inStock) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold">Out of Stock</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <h3 className="font-semibold mb-3">Select Size</h3>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-2 border-2 rounded-lg font-medium transition-colors ${
                selectedSize === size
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <h3 className="font-semibold mb-3">Quantity</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={decrementQuantity}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  )
}

