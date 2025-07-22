import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // These work with static export
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
