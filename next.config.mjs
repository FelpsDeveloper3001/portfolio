import 'dotenv/config'


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
  env: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
}

export default nextConfig
