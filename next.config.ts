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
  reactStrictMode: false,
  swcMinify: true,
};

export default nextConfig;