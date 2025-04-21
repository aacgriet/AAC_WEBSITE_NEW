/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  env: {
    SANITY_PROJECT_ID: 'dqyhuxze',
    SANITY_DATASET: 'production',
  },
}

export default nextConfig;