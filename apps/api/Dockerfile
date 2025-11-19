# API Dockerfile
FROM node:20-alpine AS base
RUN npm install -g pnpm@8
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
RUN pnpm install --frozen-lockfile --filter @apps/api

# Runner
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app/apps/api

COPY --from=deps /app/node_modules ../../node_modules
COPY --from=deps /app/apps/api/node_modules ./node_modules
COPY apps/api ./

EXPOSE 5000
ENV PORT 5000

CMD ["node", "src/server.js"]
