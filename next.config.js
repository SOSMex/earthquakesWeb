/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Android App Links
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        // iOS Universal Links
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/earthquakes',
        destination: '/sismos',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
