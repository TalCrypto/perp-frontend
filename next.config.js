/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },
  reactStrictMode: true,
  images: {
    domains: ['i.seadn.io']
  },
  async rewrites() {
    return [
      {
        source: '/trade/:collection',
        destination: '/trade?collection=:collection'
      },
      {
        source: '/airdrop/:target',
        destination: '/airdrop?target=:target'
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trade',
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
