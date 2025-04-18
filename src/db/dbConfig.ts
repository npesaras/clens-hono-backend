import { drizzle } from 'drizzle-orm/postgres-js';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { env } from '@/utils/env';
import * as schema from './schema';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create drizzle database instance with schema type
export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema }); 