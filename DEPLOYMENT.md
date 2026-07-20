# Production deployment

The admin dashboard deliberately uses authenticated API Routes (`/api/content`
and `/api/upload`) rather than Server Actions. This prevents the content
create/edit/save flow from depending on build-specific Server Action IDs.

For each deployment:

1. Build a new image from the repository; do not mount or reuse `.next` from a
   host volume. The Docker build context excludes both `.next` and TypeScript
   incremental build state.
2. Configure the platform for an atomic/rolling rollout: keep the previous
   container out of load-balancer rotation before sending traffic to the new
   container, and wait for Docker's health check to pass. Never round-robin
   requests between different image revisions.
3. Do not cache `/admin/*`, RSC responses, or `POST /api/*` at a CDN/reverse
   proxy. `next.config.ts` sends `Cache-Control: private, no-store` for the
   dashboard; preserve that header in the proxy.
4. Cache only versioned `/_next/static/*` assets long-term. Do not rewrite
   those requests to another deployment's filesystem.

With these rules, a user who opens the dashboard after a deployment receives a
fresh page/action manifest. Users holding a page from an older release still
need one reload; no server can execute a Server Action ID that does not exist
in its own build manifest.
