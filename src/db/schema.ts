import { pgTable, serial, text, timestamp, pgEnum, integer } from 'drizzle-orm/pg-core';

// Create the enum types
export const userTypeEnum = pgEnum('usertype', ['admin', 'civilian', 'collector']);
export const privilegeLevelEnum = pgEnum('privilege_level', ['superadmin', 'moderator', 'staff']);

// User Table
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

// Admin Table
export const admin = pgTable('admin', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  privilegeLevel: privilegeLevelEnum('privilege_level').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});