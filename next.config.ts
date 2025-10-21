import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  experimental: {
    ppr: "incremental",
    //after: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
