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
EXPOSE 5000

# Create a .env file if it doesn't exist
# PORT 5000 is the port the app runs on
# DATABASE_URL is the database URL
# ACCESS_TOKEN is the access token for the app
# SALT_ROUNDS is the number of salt rounds for the password
# RATE_LIMIT_WINDOW is the window for the rate limit
# RATE_LIMIT_MAX is the maximum number of requests per window
# HEALTH_CHECK_PATH is the path for the health check

RUN if [ ! -f .env ]; then \
    echo "NODE_ENV=production" > .env && \
    echo "PORT=5000" >> .env && \  
    echo "DATABASE_URL=postgres://postgres:postgres@postgres:5432/hono_db" >> .env && \
    echo "ACCESS_TOKEN=your_access_token_here" >> .env && \
    echo "SALT_ROUNDS=10" >> .env && \
    echo "RATE_LIMIT_WINDOW=900000" >> .env && \
    echo "RATE_LIMIT_MAX=100" >> .env && \
    echo "HEALTH_CHECK_PATH=/health" >> .env; \
    fi

# Command to run the application
CMD ["pnpm", "dev"] 