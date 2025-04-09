import { pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// Create the enum type
export const userTypeEnum = pgEnum('usertype', ['admin', 'civilian', 'collector']);

// Example table schema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  usertype: userTypeEnum('usertype'),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  firstname: text('firstname').notNull(),
  middlename: text('middlename').notNull(),
  lastname: text('lastname').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
}); 