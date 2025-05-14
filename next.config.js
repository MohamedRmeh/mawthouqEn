const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
};

module.exports = withNextIntl(nextConfig);
