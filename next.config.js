/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      'media.graphassets.com',
      'www.notion.so',
      's3.us-west-2.amazonaws.com',
      'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  reactStrictMode: true
};
