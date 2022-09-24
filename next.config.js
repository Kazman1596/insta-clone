/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['upload.wikimedia.org', 'static.xx.fbcdn.net']
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
