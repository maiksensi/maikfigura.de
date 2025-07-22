import Head from 'next/head'
import { siteConfig } from '@/lib/config'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
}

export function SEO({ title, description, canonical }: SEOProps) {
  const pageTitle = title ? `${title} - ${siteConfig.headerMetadata.title}` : siteConfig.headerMetadata.title
  const pageDescription = description || siteConfig.headerMetadata.description
  const pageCanonical = canonical || siteConfig.headerMetadata.canonicalUrl

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={siteConfig.headerMetadata.keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={pageCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Maik Figura" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Head>
  )
}
