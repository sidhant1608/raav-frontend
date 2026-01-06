import { PortableTextBlock } from '@portabletext/types'

export interface Product {
  _id: string
  _type: 'product'
  name: string
  slug: {
    current: string
  }
  description: PortableTextBlock[]
  price: number
  images: Array<{
    _key: string
    asset: {
      _ref: string
      _type: 'reference'
    }
  }>
  sizes: string[]
  category: {
    _id: string
    _type: 'reference'
    name: string
    slug: {
      current: string
    }
  }
  inStock: boolean
  featured: boolean
}

export interface Category {
  _id: string
  _type: 'category'
  name: string
  slug: {
    current: string
  }
  description?: string
}

export interface CartItem {
  product: Product
  size: string
  quantity: number
}

export interface ShippingInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  country: string
}

