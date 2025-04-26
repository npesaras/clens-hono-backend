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

# Fix line endings in the script and make it executable
RUN sed -i 's/\r$//' scripts/dockerStart.sh && chmod +x scripts/dockerStart.sh

# Expose the port the app runs on
EXPOSE 5000

# Use the start script as dockerStart.sh
CMD ["/bin/sh", "./scripts/dockerStart.sh"] 