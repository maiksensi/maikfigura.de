import Link from 'next/link'
import { SEO } from '@/components/SEO'
import Navigation from '@/components/Navigation'

export default function Custom404() {
  return (
    <>
      <SEO title="Page Not Found" />
      <Navigation />
      <main className="container pt-4 px-4 md:mx-auto xl:px-32 leading-loose">
        <div className="mt-16 text-center">
          <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link 
            href="/about" 
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go to About Page
          </Link>
        </div>
      </main>
    </>
  )
}
