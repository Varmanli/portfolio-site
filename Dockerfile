# Production Dockerfile for shemirani (Next.js, standalone output).
# Designed for Coolify's "Dockerfile" build pack. No secrets are baked in —
# all values below are supplied by Coolify's build/runtime environment.

# ---- deps: install dependencies reproducibly -------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: typecheck + build --------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined at build time — Coolify must provide these
# as build-time variables. DATABASE_URL is also read at build time by pages
# that import the DB client at module scope, and by db:push/db:seed:prod
# below — it must be a real, reachable connection string at build time
# (Coolify's Docker build must be able to reach the database over the
# network). ADMIN_EMAIL/ADMIN_PASSWORD are consumed only by db:seed:prod to
# create/update the admin user and are never inlined into client bundles.
ARG NEXT_PUBLIC_SITE_URL
ARG DATABASE_URL
ARG ADMIN_EMAIL
ARG ADMIN_PASSWORD
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV ADMIN_EMAIL=$ADMIN_EMAIL
ENV ADMIN_PASSWORD=$ADMIN_PASSWORD
ENV NODE_ENV=production

RUN npx tsc --noEmit
RUN npm run db:push
RUN npm run db:seed:prod
RUN npm run build

# ---- runner: minimal production image --------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3001

# A proxy must only route traffic to a fully started revision. This is
# especially important for Next.js Server Action manifests, which are tied to
# one build and must not be mixed across old/new containers during a rollout.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3001/ > /dev/null || exit 1

# Real secrets (DATABASE_URL, AUTH_SECRET, ARVAN_S3_*, ADMIN_EMAIL/PASSWORD)
# must be provided as runtime environment variables in Coolify — never baked
# into this image. The schema is applied and the admin user/default content
# are seeded during the builder stage (above, via db:push and db:seed:prod,
# since db:migrate failed to create required tables like `content` in
# production, and the standalone runtime image has no tsx/devDependencies
# to run the seed script post-deploy).
CMD ["node", "server.js"]
