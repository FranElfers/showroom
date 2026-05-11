import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev",
      },
    ],
    qualities: [15, 25, 50, 75, 100],
  },
};

export default nextConfig;
