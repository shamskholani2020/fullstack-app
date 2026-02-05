# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Build arguments (optional overrides)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SUPABASE_PROJECT_REF

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# DEBUG: List environment files
RUN echo "=== DEBUG: Environment Files ===" && \
    ls -la | grep env || echo "No .env files found in root" && \
    echo "=== DEBUG: Checking .env.local ===" && \
    if [ -f .env.local ]; then \
      echo ".env.local exists, size: $(wc -c < .env.local) bytes" && \
      echo "First 3 lines:" && \
      head -3 .env.local | sed 's/=.*/=***/'; \
    else \
      echo ".env.local NOT FOUND"; \
    fi

# ALWAYS create .env.local with hardcoded values (foolproof approach)
RUN echo "# Created by Dockerfile at build time" > .env.local && \
    echo "NEXT_PUBLIC_SUPABASE_URL=https://supabase.kholani.store" >> .env.local && \
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzAxNTE5NzIsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.2OFTnDKqV42NvGDOtc7oieh8wR6HTQIdYJjGH_KW8wU" >> .env.local && \
    echo "NEXT_PUBLIC_SUPABASE_PROJECT_REF=bader" >> .env.local && \
    echo ".env.local created successfully"

# Override with build arguments if provided (optional)
RUN if [ -n "$NEXT_PUBLIC_SUPABASE_URL" ]; then \
      echo "OVERRIDING: NEXT_PUBLIC_SUPABASE_URL" && \
      echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" > .env.local; \
    fi
RUN if [ -n "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then \
      echo "OVERRIDING: NEXT_PUBLIC_SUPABASE_ANON_KEY" && \
      echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY" >> .env.local; \
    fi
RUN if [ -n "$NEXT_PUBLIC_SUPABASE_PROJECT_REF" ]; then \
      echo "OVERRIDING: NEXT_PUBLIC_SUPABASE_PROJECT_REF" && \
      echo "NEXT_PUBLIC_SUPABASE_PROJECT_REF=$NEXT_PUBLIC_SUPABASE_PROJECT_REF" >> .env.local; \
    fi

# DEBUG: Show final .env.local (sanitized)
RUN echo "=== DEBUG: Final .env.local ===" && \
    cat .env.local | sed 's/=.*/=***/'

# Set build environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN echo "=== Starting npm run build ===" && \
    npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Runtime environment variables (can be passed from Dokploy)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SUPABASE_PROJECT_REF

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
ENV NEXT_PUBLIC_SUPABASE_PROJECT_REF=${NEXT_PUBLIC_SUPABASE_PROJECT_REF:-bader}

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy entrypoint script
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh

# Set permissions
RUN chown -R nextjs:nodejs /app
RUN chmod +x /app/docker-entrypoint.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "server.js"]
