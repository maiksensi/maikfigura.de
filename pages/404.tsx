import Link from 'next/link'
import type { CSSProperties } from 'react'
import Navigation from '@/components/Navigation'
import { SEO } from '@/components/SEO'

export default function Custom404() {
  return (
    <>
      <SEO title="Page Not Found" />
      <Navigation />
      <main
        id="main"
        tabIndex={-1}
        className="comic-shell min-h-screen pt-4 px-4 leading-relaxed focus:outline-none"
      >
        <div className="mt-28 mx-auto max-w-2xl text-center">
          <span
            aria-hidden="true"
            className="comic-burst mb-8"
            style={{ '--burst-size': '12rem' } as CSSProperties}
          >
            <span>BLAM!</span>
          </span>
          <h1 className="comic-heading text-5xl mb-8">404 - Page Not Found</h1>
          <p className="speech-bubble mb-14 text-lg font-bold">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link href="/about" className="comic-button">
            Go to About Page
          </Link>
        </div>
      </main>
    </>
  )
}
