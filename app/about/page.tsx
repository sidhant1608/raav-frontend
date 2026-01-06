import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'

async function getAboutPage() {
  const page = await client.fetch(pageBySlugQuery, { slug: 'about' })
  return page
}

export const metadata = {
  title: 'About Us | RAAV',
  description: 'Learn about RAAV - our mission, values, and commitment to quality fashion.',
}

export default async function AboutPage() {
  const page = await getAboutPage()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
          {page?.title || 'About RAAV'}
        </h1>

        {page?.content ? (
          <div className="prose prose-lg max-w-none">
            <PortableText value={page.content} />
          </div>
        ) : (
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              Welcome to RAAV, where fashion meets timeless elegance. We are a modern fashion
              brand dedicated to creating high-quality, stylish clothing that speaks to your
              unique sense of style.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
              <p className="leading-relaxed">
                At RAAV, we believe that fashion is more than just clothing—it's a form of
                self-expression. Our mission is to provide you with carefully crafted pieces that
                combine contemporary design with exceptional quality, allowing you to express your
                individuality with confidence.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Quality First</h2>
              <p className="leading-relaxed">
                Every piece in our collection is thoughtfully designed and crafted with attention to
                detail. We work with skilled artisans and use premium materials to ensure that our
                products not only look great but also stand the test of time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Sustainability</h2>
              <p className="leading-relaxed">
                We are committed to sustainable fashion practices. From sourcing eco-friendly
                materials to ethical manufacturing processes, we strive to minimize our
                environmental impact while creating beautiful, long-lasting pieces.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

