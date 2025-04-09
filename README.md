# Clens Hono Kit

A modern RESTful API built with Hono.js, Drizzle ORM, and PostgreSQL, featuring user management with authentication.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-4.x-orange.svg)](https://hono.dev/)

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- RESTful API with CRUD operations
- PostgreSQL database integration using Drizzle ORM
- Authentication middleware
- TypeScript support
- Docker containerization
- Environment-based configuration
- Database migrations
- Input validation

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## 🚀 Installation

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
   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/hono_db
   ACCESS_TOKEN=your-secret-token-123
   ```

4. Start the database:
   ```bash
   docker-compose up -d
   ```

5. Run migrations:
   ```bash
   pnpm run migrate
   ```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection URL | `postgres://postgres:postgres@localhost:5432/hono_db` |
| `ACCESS_TOKEN` | Authentication token for API access | `your-secret-token-123` |

## 📝 Usage

### Development

Start the development server:
```bash
pnpm run dev
```
The server will be running at `http://localhost:3000`

### Database Management

Access Drizzle Studio for database management:
```bash
pnpm run studio
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run generate` | Generate database migrations |
| `pnpm run migrate` | Run database migrations |
| `pnpm run studio` | Open Drizzle Studio |

## 📚 API Documentation

### Authentication

All endpoints require Bearer token authentication:
```http
Authorization: Bearer your-secret-token-123
```

### Endpoints

#### User Management

##### Create User
```http
POST /users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com"
}
```

##### Get All Users
```http
GET /users
```

##### Get User by ID
```http
GET /users/:id
```

##### Update User
```http
PUT /users/:id
Content-Type: application/json

{
    "name": "John Updated"
}
```

##### Delete User
```http
DELETE /users/:id
```

### Response Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

## 💾 Database

### Configuration

- Host: localhost
- Port: 5432
- User: postgres
- Password: postgres
- Database: hono_db

### Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 📁 Project Structure

```
clens-hono-kit/
├── src/
│   ├── controllers/    # Route handlers
│   ├── db/            # Database configuration and schemas
│   ├── middlewares/   # Custom middlewares
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── index.ts       # Application entry point
├── drizzle/           # Database migrations
├── tests/            # Test files
├── docker-compose.yml
├── .env.example
└── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ using [Hono](https://hono.dev/) and [Drizzle ORM](https://orm.drizzle.team/)

```
open http://localhost:3000
```