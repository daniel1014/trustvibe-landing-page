/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
  },
  basePath: '/trustvibe',
  assetPrefix: '/trustvibe/',  // <-- Add this (ensures _next/static/... prefixes correctly)
}

export default nextConfig
