import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb',
    },
  },
  eslint:{
    ignoreDuringBuilds:true
  }
};

export default nextConfig;
