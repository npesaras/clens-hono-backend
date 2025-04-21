# Clens Hono Kit

A modern RESTful API built with Hono.js, Drizzle ORM, and PostgreSQL, featuring user management with authentication.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-4.x-orange.svg)](https://hono.dev/)

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Project Structure](#project-structure)

<br>

# Features

- RESTful API with CRUD operations
- PostgreSQL database integration using Drizzle ORM
- Token-based authentication
- TypeScript support
- Docker containerization
- Environment-based configuration
- Database migrations with Drizzle Kit
- Input validation using Zod
- Soft delete functionality
- User type management (admin, civilian, collector)

<br>

# Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) (via Docker)

<br>

# Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd clens-hono-kit
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create environment configuration:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/hono_db
   ACCESS_TOKEN=your-secret-token-123
   SALT_ROUNDS=10
   RATE_LIMIT_WINDOW=900000
   RATE_LIMIT_MAX=100
   HEALTH_CHECK_PATH=/health
   ```

5. Start the database:
   ```bash
   docker-compose up -d
   ```

6. Run migrations:
   ```bash
   pnpm run migrate
   ```

<br>

# Usage


### Database

Start the development server:
```bash
pnpm run dev
```
The server will be running at `http://localhost:3000`


### Database Management

Generate migrations:
```bash
pnpm run generate
```

Run migrations:
```bash
pnpm run migrate
```

Access Drizzle Studio:
```bash
pnpm run studio
```

<br>

# API Documentation

## Response Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Username/email already exists |
| 500 | Server Error |

<br>

# Project-Structure

```
clens-hono-kit/
├── src/
│   ├── controllers/     # Route handlers and request validation
│   │   └── users/      # User-related controllers
│   ├── db/             # Database configuration and schemas
│   ├── middlewares/    # Authentication and other middlewares
│   ├── services/       # Business logic and data access
│   ├── utils/          # Utility functions and error handling
│   └── index.ts        # Application entry point
├── drizzle/            # Database migrations
├── tests/              # Test files
├── docker-compose.yml  # Docker services configuration
├── .env.example        # Environment variables template
└── package.json        # Project dependencies and scripts
```