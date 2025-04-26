FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install PNPM
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm migrate

# Expose the port the app runs on
EXPOSE 3000

# Create a .env file if it doesn't exist
RUN if [ ! -f .env ]; then \
    echo "NODE_ENV=production" > .env && \
    echo "PORT=3000" >> .env && \
    echo "DATABASE_URL=postgres://postgres:postgres@postgres:5432/hono_db" >> .env && \
    echo "ACCESS_TOKEN=your_access_token_here" >> .env && \
    echo "SALT_ROUNDS=10" >> .env && \
    echo "RATE_LIMIT_WINDOW=900000" >> .env && \
    echo "RATE_LIMIT_MAX=100" >> .env && \
    echo "HEALTH_CHECK_PATH=/health" >> .env; \
    fi

# Command to run the application
CMD ["pnpm", "dev"] 