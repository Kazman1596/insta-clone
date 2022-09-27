/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['upload.wikimedia.org', 'static.xx.fbcdn.net', 'images.unsplash.com']
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
