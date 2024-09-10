/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    missingSuspenseWithCSRBailout: false,
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
