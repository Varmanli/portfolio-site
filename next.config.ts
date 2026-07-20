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
  async headers() {
    return [
      {
        // Dashboard pages contain authenticated, interactive forms. Serving a
        // cached RSC/HTML response after a rollout can pair an old client with
        // a new server action manifest, so these responses must never be
        // cached by a browser, CDN, or reverse proxy.
        source: "/admin/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
