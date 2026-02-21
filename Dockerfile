# Gunakan node versi stabil
FROM node:24-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files dulu (biar cache optimal)
COPY package.json pnpm-lock.yaml prisma.config.ts ./
COPY prisma ./prisma

# Install dependencies
RUN pnpm install

# Copy semua source code
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Build TypeScript
RUN pnpm build

# Expose port
EXPOSE 5055

# Jalankan hasil build
CMD ["node", "dist/src/server.js"]