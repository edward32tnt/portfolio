/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['media.graphassets.com', 'www.notion.so'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        port: '',
        pathname: '/'
      },
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
