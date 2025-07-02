/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove appDir as it's no longer needed in Next.js 14
  },
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig; 