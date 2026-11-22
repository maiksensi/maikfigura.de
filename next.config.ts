import type { NextConfig } from 'next'

// Dev needs eval for React Refresh; production bundles run without it.
const isDev = process.env.NODE_ENV === 'development'

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; script-src 'self'${isDev ? " 'unsafe-eval'" : ''}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`,
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Robots-Tag',
    value: 'noai, noimageai',
  },
  {
    key: 'X-AI-Opt-Out',
    value: 'all',
  },
  {
    key: 'tdm-reservation',
    value: '1',
  },
]

const nextConfig: NextConfig = {
  compress: true,
  // Remove X-Powered-By: Next.js header for security (reduces information disclosure to attackers)
  poweredByHeader: false,
  experimental: {
    // Next 16.4 turns the shared runtime on by default. It inlines the Turbopack bootstrap
    // into every page, which `script-src 'self'` blocks, so the site never hydrates. Off keeps
    // the bootstrap an external script. https://github.com/vercel/next.js/issues/99800
    turbopackSharedRuntime: false,
  },
  async redirects() {
    return [{ source: '/', destination: '/about', permanent: false }]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
