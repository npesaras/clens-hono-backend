import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import pkg from 'pg';

import * as schema from './schema';

import { env } from '@/utils/env';
const { Pool } = pkg;

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create drizzle database instance with schema type
export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
