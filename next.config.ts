const nextConfig = {
  webpack: (config: any, { dev }: { dev: boolean }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    if (dev) {
      config.devtool = 'source-map';
    }

    return config;
  },
  experimental: {
    turbopack: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  env: {
    NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
  },
  reactStrictMode: false,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-robots-tag',
            value: 'noindex',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
