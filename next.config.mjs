/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 's3-flowcraft.s3.amazonaws.com',
      // port: '',
      // pathname: '',
    }]
  },
};

export default nextConfig;
