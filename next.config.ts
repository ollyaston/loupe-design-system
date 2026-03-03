import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["cdn.brandfetch.io", "d3dt0rzkux8e8b.cloudfront.net"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "highcharts/esm/highcharts.src.js": require.resolve(
        "highcharts/esm/highcharts.src.js",
      ),
    };
    return config;
  },
};

export default nextConfig;
