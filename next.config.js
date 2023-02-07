/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'i.pravatar.cc']
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
