/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
  },

  webpack: (config, _) => {
    // If there's an existing watchOptions configuration, spread it here; otherwise, just an empty object
    const watchOptions = config.watchOptions || {};

    return {
      ...config,
      watchOptions: {
        ...watchOptions,
        poll: 800, // Check for changes every 800ms
        aggregateTimeout: 300, // Delay the rebuild after the first change for 300ms
      },
    };
  },
};

module.exports = nextConfig;
