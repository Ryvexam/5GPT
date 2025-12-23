import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* remove output: 'export' to allow API routes to work */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
