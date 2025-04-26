# Clens Hono Kit

A modern RESTful API built with Hono.js, Drizzle ORM, and PostgreSQL, featuring user management with authentication.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-4.x-orange.svg)](https://hono.dev/)

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Project Structure](#project-structure)

<br>

# Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) (via Docker)

<br>

# Docker Setup

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd clens-hono-kit
   ```

2. Build and start all services with Docker Compose:
   ```bash
   docker-compose up -d
   ```

   This will start three containers:
   - **hono-api**: The main application on port 5000
   - **drizzle-studio**: Database management UI on port 4000
   - **hono-drizzle-db**: PostgreSQL database on port 5432

3. Check if containers are running properly:
   ```bash
   docker ps
   ```

4. Once running, you can access:
   - API at `http://localhost:5000`
   - Drizzle Studio at `http://localhost:4000`

5. To view application logs:
   ```bash
   docker logs hono-api
   ```

6. To stop all containers:
   ```bash
   docker-compose down
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