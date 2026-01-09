import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/trustvibe",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 關閉優化以配合 worker 環境，但仍需要允許遠端主機
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
