'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { Plus, Minus, ShoppingBag, Check } from 'lucide-react'
import type { Product } from '@/types/product'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }

    setIsAdding(true)
    
    // Add item to cart
    addItem(product, selectedSize, quantity)
    
    // Show success animation
    setTimeout(() => {
      setIsAdding(false)
      setShowSuccess(true)
      
      // Reset after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
    }, 300)
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
        {sizeError && (
          <p className="text-red-600 text-sm mb-2 animate-pulse">Please select a size</p>
        )}
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size)
                setSizeError(false)
              }}
              className={`px-6 py-2 border-2 rounded-lg font-medium transition-all ${
                selectedSize === size
                  ? 'border-gray-900 bg-gray-900 text-white scale-105'
                  : sizeError && !selectedSize
                  ? 'border-red-300 bg-red-50 text-red-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:scale-105'
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
        disabled={isAdding || showSuccess}
        className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          showSuccess
            ? 'bg-green-600 text-white scale-105'
            : isAdding
            ? 'bg-gray-600 text-white cursor-wait'
            : 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-[1.02] active:scale-95'
        }`}
      >
        {showSuccess ? (
          <>
            <Check className="w-5 h-5 animate-in fade-in zoom-in duration-300" />
            <span className="animate-in fade-in slide-in-from-right-2 duration-300">
              Added to Cart!
            </span>
          </>
        ) : isAdding ? (
          <>
            <ShoppingBag className="w-5 h-5 animate-spin" />
            <span>Adding...</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  )
}

