/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ["placeholder.svg"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
<<<<<<< HEAD
  // Suppress hydration warnings for CSS variables
=======
  // Add debugging
>>>>>>> 6e145206bb29ccd7c576a75191e15c2fe0a13e10
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
<<<<<<< HEAD
  // Suppress hydration warnings
  reactStrictMode: false,
=======
>>>>>>> 6e145206bb29ccd7c576a75191e15c2fe0a13e10
}

module.exports = nextConfig