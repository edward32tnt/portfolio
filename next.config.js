/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['media.graphassets.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        port: '',
        pathname: '/'
      }
    ]
  },
  reactStrictMode: true
};
