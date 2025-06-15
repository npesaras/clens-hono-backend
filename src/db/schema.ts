import {
  boolean,
  date,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  time,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// =============================================================================
// ENUMS - Exactly matching ERD specifications
// =============================================================================

export const userTypeEnum = pgEnum('usertype', [
  'admin',
  'civilian',
  'collector',
]);

export const privilegeLevelEnum = pgEnum('privilege_level', [
  'superadmin',
  'moderator',
  'staff',
]);

export const wasteTypeEnum = pgEnum('waste_type', [
  'organic',
  'recyclable',
  'hazardous',
  'non-recyclable',
]);

export const sensorTypeEnum = pgEnum('sensor_type', [
  'type1',
  'type2',
  'type3',
]);

export const connectionModeEnum = pgEnum('connection_mode', ['Wifi', 'lora']);

export const statisticsTypeEnum = pgEnum('statistics_type', [
  'civilian',
  'barangay',
]);

export const intervalEnum = pgEnum('interval_type', [
  'day',
  'week',
  'month',
  'year',
]);

// =============================================================================
// LOCATION HIERARCHY TABLES
// =============================================================================

// Province Table - exactly matching ERD
export const province = pgTable('province', {
  id: serial('id').primaryKey(),
  code: integer('code').notNull(),
  name: text('name').notNull(),
});

// City Table - exactly matching ERD
export const city = pgTable('city', {
  id: serial('id').primaryKey(),
  code: integer('code').notNull(),
  name: text('name').notNull(),
  provinceId: integer('province_id')
    .notNull()
    .references(() => province.id),
});

// Barangay Table - exactly matching ERD
export const barangay = pgTable('barangay', {
  id: serial('id').primaryKey(),
  code: integer('code').notNull(),
  name: text('name').notNull(),
  provinceId: integer('province_id')
    .notNull()
    .references(() => province.id),
  cityId: integer('city_id')
    .notNull()
    .references(() => city.id),
  leaderboardRank: integer('leaderboard_rank'),
  totalDisposed: integer('total_disposed'),
});

// Address Table - exactly matching ERD
export const address = pgTable('address', {
  id: serial('id').primaryKey(),
  street: text('street').notNull(),
  provinceId: integer('province_id')
    .notNull()
    .references(() => province.id),
  cityId: integer('city_id')
    .notNull()
    .references(() => city.id),
  barangayId: integer('barangay_id')
    .notNull()
    .references(() => barangay.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// =============================================================================
// USER MANAGEMENT TABLES
// =============================================================================

// User Table - exactly matching ERD

// User Table - exactly matching ERD
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  usertype: userTypeEnum('user_type'),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 50 }).notNull().unique(),
  firstName: varchar('first_name', { length: 30 }).notNull(),
  middleName: varchar('middle_name', { length: 30 }).notNull(),
  lastName: varchar('last_name', { length: 30 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Admin Table - exactly matching ERD (datetime -> timestamp in Postgres)
export const admin = pgTable('admin', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  privilegeLevel: privilegeLevelEnum('privilege_level').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Civilian Table - exactly matching ERD (datetime -> timestamp in Postgres)
export const civilian = pgTable('civilian', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  addressId: integer('address_id')
    .notNull()
    .references(() => address.id),
  level: integer('level').notNull(),
  exp: integer('exp').notNull(),
  streak: integer('streak').notNull(),
  leaderboardRank: integer('leaderboard_rank'),
  totalVolumeDisposed: doublePrecision('total_volume_disposed').notNull(),
  points: doublePrecision('points').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// =============================================================================
// OPERATIONAL TABLES (Trucks, Routes, Locations)
// =============================================================================

// Truck Table - exactly matching ERD (datetime -> timestamp in Postgres)
export const truck = pgTable('truck', {
  id: serial('id').primaryKey(),
  plateNumber: varchar('plate_number').notNull(),
  active: boolean('active').notNull(),
  userId: integer('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  totalCollectedVolume: doublePrecision('total_collected_volume').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Location Table - exactly matching ERD (datetime -> timestamp in Postgres)
export const location = pgTable('location', {
  id: serial('id').primaryKey(),
  latitude: varchar('latitude').notNull(),
  longitude: varchar('longitude').notNull(),
  truckId: integer('truck_id')
    .notNull()
    .references(() => truck.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Truck Route Table - exactly matching ERD (datetime -> timestamp in Postgres, geometry -> text)
export const truckRoute = pgTable('truck_route', {
  id: serial('id').primaryKey(),
  truckId: integer('truck_id')
    .notNull()
    .references(() => truck.id),
  route: text('route').notNull(), // geometry type stored as text in Postgres
  validFrom: timestamp('valid_from').notNull(),
  validTo: timestamp('valid_to').notNull(),
});

// =============================================================================
// WASTE MANAGEMENT TABLES
// =============================================================================

// Trash Record Table - exactly matching ERD (datetime -> timestamp in Postgres)
export const trashRecord = pgTable('trash_record', {
  id: serial('id').primaryKey(),
  civilianId: integer('civilian_id')
    .notNull()
    .references(() => civilian.id),
  volume: doublePrecision('volume').notNull(),
  segregationScore: doublePrecision('segregation_score').notNull(),
  recyclingScore: doublePrecision('recycling_score').notNull(),
  wasteType: wasteTypeEnum('waste_type').notNull(),
  collected: boolean('collected').notNull(),
  dateDisposed: timestamp('date_disposed').notNull(),
  dateCollected: timestamp('date_collected'),
  collectorId: integer('collector_id').references(() => truck.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// =============================================================================
// SENSOR & MONITORING TABLES
// =============================================================================

// Sensor Table - exactly matching ERD
export const sensor = pgTable('sensor', {
  id: serial('id').primaryKey(),
  activeStatus: boolean('active_status').notNull(),
  barangayId: integer('barangay_id')
    .notNull()
    .references(() => barangay.id),
  sensorType: sensorTypeEnum('sensor_type').notNull(),
});

// Sensor Data Table - exactly matching ERD
export const sensorData = pgTable('sensor_data', {
  id: serial('id').primaryKey(),
  sensorId: integer('sensor_id')
    .notNull()
    .references(() => sensor.id),
  ph: doublePrecision('ph').notNull(),
  tds: doublePrecision('tds').notNull(),
  dissolvedOxygen: doublePrecision('dissolved_oxygen').notNull(),
  turbidity: doublePrecision('turbidity').notNull(),
  orp: doublePrecision('orp').notNull(),
  electricalConductivity: doublePrecision('electrical_conductivity').notNull(),
  connectionMode: connectionModeEnum('connection_mode').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// =============================================================================
// STATISTICS & ANALYTICS TABLES
// =============================================================================

// Trash Statistics Table - exactly matching ERD
// Note: entity_id references either barangay.id or civilian.id based on type field
export const trashStatistics = pgTable('trash_statistics', {
  id: serial('id').primaryKey(),
  type: statisticsTypeEnum('type').notNull(),
  entityId: integer('entity_id').notNull(),
  leaderboardRank: integer('leaderboard_rank').notNull(),
  totalDisposed: doublePrecision('total_disposed').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});

// Water Quality Statistics Table - exactly matching ERD
export const waterQualityStatistics = pgTable(
  'water_quality_statistics',
  {
    interval: intervalEnum('interval').notNull(),
    startDate: date('start_date').notNull(),
    sensorId: integer('sensor_id')
      .notNull()
      .references(() => sensor.id),
    avePh: doublePrecision('ave_ph').notNull(),
    aveTds: doublePrecision('ave_tds').notNull(),
    aveDissolvedOxygen: doublePrecision('ave_dissolved_oxygen').notNull(),
    aveTurbidity: doublePrecision('ave_turbidity').notNull(),
    aveOrp: doublePrecision('ave_orp').notNull(),
    aveElectricalConductivity: doublePrecision(
      'ave_electrical_conductivity'
    ).notNull(),
    updatedAt: timestamp('updated_at'),
  },
  table => {
    return {
      pk: primaryKey({ columns: [table.interval, table.startDate] }),
    };
  }
);

// =============================================================================
// CONFIGURATION & SCHEDULING TABLES
// =============================================================================

// Reward Multipliers Table - exactly matching ERD
export const rewardMultipliers = pgTable('reward_multipliers', {
  id: serial('id').primaryKey(),
  barangayId: integer('barangay_id')
    .notNull()
    .references(() => barangay.id),
  interval: intervalEnum('interval').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  multiplierExp: doublePrecision('multiplier_exp').notNull(),
  multiplierPoints: doublePrecision('multiplier_points').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// Collection Schedule Table - exactly matching ERD
export const collectionSchedule = pgTable('collection_schedule', {
  id: serial('id').primaryKey(),
  barangayId: integer('barangay_id')
    .notNull()
    .references(() => barangay.id),
  collectionDate: date('collection_date').notNull(),
  collectionTime: time('collection_time').notNull(),
});
