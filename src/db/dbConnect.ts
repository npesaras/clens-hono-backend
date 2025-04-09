import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString,
});

// Create drizzle database instance
export const db = drizzle(pool);