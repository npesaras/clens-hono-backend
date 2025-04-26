FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install PNPM and PostgreSQL client (for healthcheck)
RUN apk add --no-cache postgresql-client && \
    npm install -g pnpm

# Copy package.json and pnpm-lock.yaml first (for better layer caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Create a .env file if it doesn't exist
# Note: We set DATABASE_URL to postgres:5432 which is the docker-compose service name
RUN if [ ! -f .env ]; then \
    echo "NODE_ENV=production" > .env && \
    echo "PORT=5000" >> .env && \
    echo "DATABASE_URL=postgres://postgres:postgres@postgres:5432/hono_db?sslmode=disable" >> .env && \
    echo "ACCESS_TOKEN=your-secret-token-123" >> .env && \
    echo "SALT_ROUNDS=10" >> .env && \
    echo "RATE_LIMIT_WINDOW=900000" >> .env && \
    echo "RATE_LIMIT_MAX=100" >> .env && \
    echo "HEALTH_CHECK_PATH=/health" >> .env; \
    fi

# Expose the port the app runs on
EXPOSE 5000

# Create a startup script directly in the Dockerfile
CMD ["sh", "-c", "echo 'Waiting for postgres...' && until PGPASSWORD=postgres pg_isready -h postgres -U postgres; do echo 'Postgres is unavailable - sleeping'; sleep 2; done && echo 'Postgres is up - running migrations' && pnpm migrate && echo 'Starting application...' && exec pnpm dev"] 