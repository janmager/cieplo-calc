import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack5: true,
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
    };

    return config;
  },
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "**",
        },
    ],
},
};

export default nextConfig;
