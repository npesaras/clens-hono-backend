// Import necessary dependencies from drizzle-orm
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;


// Load environment variables from .env file
dotenv.config();


// Get database connection string from environment variables
const connectionString = process.env.DATABASE_URL;


// Validate that DATABASE_URL is set
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}


// Create a PostgreSQL connection pool
// This pool manages multiple database connections efficiently
const pool = new Pool({
  connectionString,
});


// Initialize drizzle with the PostgreSQL pool
const db = drizzle(pool);


// Main function to run the migrations
async function main() {
  console.log('Migration started');
  await migrate(db, { migrationsFolder: 'drizzle' }); // Execute all pending migrations from the 'drizzle' folder
  console.log('Migration completed');
  process.exit(0); // Exit the process successfully
}


// Error handling for the migration process
main().catch((err) => {
  console.error(err);
  process.exit(1); // Exit the process with an error code
});