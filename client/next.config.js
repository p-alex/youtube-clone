/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
