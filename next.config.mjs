/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    SANITY_PROJECT_ID: 'dqyhuxze',
    SANITY_DATASET: 'production',
  },
}

export default nextConfig;