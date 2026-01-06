'use client'

import { useCartStore } from '@/lib/store'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/lib/image'
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const totalPrice = getTotalPrice()
  const shipping = totalPrice > 0 ? 100 : 0
  const finalTotal = totalPrice + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Link
            href="/shop"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const imageUrl = item.product.images?.[0]
                ? urlForImage(item.product.images[0]).width(300).height(400).url()
                : '/placeholder.jpg'

              return (
                <div
                  key={`${item.product._id}-${item.size}`}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="relative w-24 h-32 flex-shrink-0">
                    <Image
                      src={imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/shop/${item.product.slug.current}`}
                      className="text-lg font-semibold text-gray-900 hover:text-gray-600"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-gray-600 mt-1">Size: {item.size}</p>
                    <p className="text-gray-900 font-semibold mt-2">
                      ₹{item.product.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.size, item.quantity - 1)
                          }
                          className="p-2 hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.size, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product._id, item.size)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{shipping.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="block w-full mt-3 text-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

