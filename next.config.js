const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
         {
        protocol: "http", // أضف هذا السطر
        hostname: "127.0.0.1", // للسماح بتحميل الصور من الـ localhost
        port: "8000", // يمكنك حذفه إن لم يكن ثابتًا
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/images/heroY.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
