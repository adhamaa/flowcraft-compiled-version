/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    domains: ['s3-flowcraft.s3.amazonaws.com'],
  },
};

export default nextConfig;
