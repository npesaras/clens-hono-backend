# Clens Hono Kit

A modern web application built with Hono.js, Drizzle ORM, and PostgreSQL.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Project Setup

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd clens-hono-kit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/hono_db
   ```

4. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```

5. Run database migrations:
   ```bash
   npm run migrate
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run generate` - Generate database migrations
- `npm run migrate` - Run database migrations
- `npm run studio` - Open Drizzle Studio for database management

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The server will be running at `http://localhost:3000`

3. To manage your database through Drizzle Studio:
   ```bash
   npm run studio
   ```

## API Endpoints

- `GET /` - Welcome message
- `GET /users` - Get all users
- `POST /users` - Create a new user
  - Required fields: `name` and `email`

## Database Configuration

The project uses PostgreSQL with the following default configuration:
- Host: localhost
- Port: 5432
- User: postgres
- Password: postgres
- Database: hono_db

## Project Structure

```
clens-hono-kit/
├── src/
│   ├── db/
│   │   ├── config.ts    # Database configuration
│   │   ├── schema.ts    # Database schema
│   │   └── migrate.ts   # Migration script
│   └── index.ts         # Main application file
├── drizzle/             # Migration files
├── docker-compose.yml   # Docker configuration
└── package.json         # Project dependencies
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

```
open http://localhost:3000
```
