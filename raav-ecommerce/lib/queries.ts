import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

export const productsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  _type,
  name,
  slug,
  description,
  price,
  images,
  sizes,
  category-> {
    _id,
    _type,
    name,
    slug
  },
  inStock,
  featured
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  _type,
  name,
  slug,
  description,
  price,
  images,
  sizes,
  category-> {
    _id,
    _type,
    name,
    slug
  },
  inStock,
  featured
}`

export const featuredProductsQuery = groq`*[_type == "product" && featured == true] | order(_createdAt desc) [0...4] {
  _id,
  _type,
  name,
  slug,
  description,
  price,
  images,
  sizes,
  category-> {
    _id,
    _type,
    name,
    slug
  },
  inStock,
  featured
}`

export const categoriesQuery = groq`*[_type == "category"] | order(name asc) {
  _id,
  _type,
  name,
  slug,
  description
}`

export const homepageQuery = groq`*[_type == "homepage"][0] {
  heroImages,
  heroTitle,
  heroSubtitle,
  featuredProducts[]-> {
    _id,
    _type,
    name,
    slug,
    description,
    price,
    images,
    sizes,
    category-> {
      _id,
      _type,
      name,
      slug
    },
    inStock,
    featured
  },
  aboutSnippet
}`

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  content,
  pageType
}`

