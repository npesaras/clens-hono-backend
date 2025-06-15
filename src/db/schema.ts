import { pgTable, serial, text, timestamp, pgEnum, integer, doublePrecision } from 'drizzle-orm/pg-core';

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

// Address Table
export const address = pgTable('address', {
  id: serial('id').primaryKey(),
  street: text('street').notNull(),
  barangay: text('barangay').notNull(),
  city: text('city').notNull(),
  province: text('province').notNull(),
  zipCode: text('zip_code').notNull(),
  country: text('country').notNull().default('Philippines'),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
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

// Civilian Table
export const civilian = pgTable('civilian', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  addressId: integer('address_id').notNull().references(() => address.id),
  level: integer('level').notNull().default(1),
  exp: integer('exp').notNull().default(0),
  streak: integer('streak').notNull().default(0),
  leaderboardRank: integer('leaderboard_rank'),
  totalVolumeDisposed: doublePrecision('total_volume_disposed').notNull().default(0.0),
  points: doublePrecision('points').notNull().default(0.0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});