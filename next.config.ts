import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Docker/Coolify deployments — bundles only the
  // production dependencies actually needed into .next/standalone.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "personal-tarsier-varmanli-69caf64d.koyeb.app",
      },
      {
        protocol: "https",
        hostname: "shemirani.s3.ir-thr-at1.arvanstorage.ir",
      },
    ],
  },
};

export default nextConfig;
