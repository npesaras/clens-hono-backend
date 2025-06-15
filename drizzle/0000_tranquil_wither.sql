CREATE TYPE "public"."connection_mode" AS ENUM('Wifi', 'lora');--> statement-breakpoint
CREATE TYPE "public"."interval_type" AS ENUM('day', 'week', 'month', 'year');--> statement-breakpoint
CREATE TYPE "public"."privilege_level" AS ENUM('superadmin', 'moderator', 'staff');--> statement-breakpoint
CREATE TYPE "public"."sensor_type" AS ENUM('type1', 'type2', 'type3');--> statement-breakpoint
CREATE TYPE "public"."statistics_type" AS ENUM('civilian', 'barangay');--> statement-breakpoint
CREATE TYPE "public"."usertype" AS ENUM('admin', 'civilian', 'collector');--> statement-breakpoint
CREATE TYPE "public"."waste_type" AS ENUM('organic', 'recyclable', 'hazardous', 'non-recyclable');--> statement-breakpoint
CREATE TABLE "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"street" text NOT NULL,
	"province_id" integer NOT NULL,
	"city_id" integer NOT NULL,
	"barangay_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"privilege_level" "privilege_level" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "admin_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "barangay" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" integer NOT NULL,
	"name" text NOT NULL,
	"province_id" integer NOT NULL,
	"city_id" integer NOT NULL,
	"leaderboard_rank" integer,
	"total_disposed" integer
);
--> statement-breakpoint
CREATE TABLE "city" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" integer NOT NULL,
	"name" text NOT NULL,
	"province_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "civilian" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"address_id" integer NOT NULL,
	"level" integer NOT NULL,
	"exp" integer NOT NULL,
	"streak" integer NOT NULL,
	"leaderboard_rank" integer,
	"total_volume_disposed" double precision NOT NULL,
	"points" double precision NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "civilian_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "collection_schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"barangay_id" integer NOT NULL,
	"collection_date" date NOT NULL,
	"collection_time" time NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"latitude" varchar NOT NULL,
	"longitude" varchar NOT NULL,
	"truck_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "province" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" integer NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reward_multipliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"barangay_id" integer NOT NULL,
	"interval" interval_type NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"multiplier_exp" double precision NOT NULL,
	"multiplier_points" double precision NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "sensor" (
	"id" serial PRIMARY KEY NOT NULL,
	"active_status" boolean NOT NULL,
	"barangay_id" integer NOT NULL,
	"sensor_type" "sensor_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sensor_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"sensor_id" integer NOT NULL,
	"ph" double precision NOT NULL,
	"tds" double precision NOT NULL,
	"dissolved_oxygen" double precision NOT NULL,
	"turbidity" double precision NOT NULL,
	"orp" double precision NOT NULL,
	"electrical_conductivity" double precision NOT NULL,
	"connection_mode" "connection_mode" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "trash_record" (
	"id" serial PRIMARY KEY NOT NULL,
	"civilian_id" integer NOT NULL,
	"volume" double precision NOT NULL,
	"segregation_score" double precision NOT NULL,
	"recycling_score" double precision NOT NULL,
	"waste_type" "waste_type" NOT NULL,
	"collected" boolean NOT NULL,
	"date_disposed" timestamp NOT NULL,
	"date_collected" timestamp,
	"collector_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "trash_statistics" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "statistics_type" NOT NULL,
	"entity_id" integer NOT NULL,
	"leaderboard_rank" integer NOT NULL,
	"total_disposed" double precision NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "truck" (
	"id" serial PRIMARY KEY NOT NULL,
	"plate_number" varchar NOT NULL,
	"active" boolean NOT NULL,
	"user_id" integer NOT NULL,
	"total_collected_volume" double precision NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "truck_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "truck_route" (
	"id" serial PRIMARY KEY NOT NULL,
	"truck_id" integer NOT NULL,
	"route" text NOT NULL,
	"valid_from" timestamp NOT NULL,
	"valid_to" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_type" "usertype",
	"username" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"first_name" varchar(30) NOT NULL,
	"middle_name" varchar(30) NOT NULL,
	"last_name" varchar(30) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "water_quality_statistics" (
	"interval" interval_type NOT NULL,
	"start_date" date NOT NULL,
	"sensor_id" integer NOT NULL,
	"ave_ph" double precision NOT NULL,
	"ave_tds" double precision NOT NULL,
	"ave_dissolved_oxygen" double precision NOT NULL,
	"ave_turbidity" double precision NOT NULL,
	"ave_orp" double precision NOT NULL,
	"ave_electrical_conductivity" double precision NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "water_quality_statistics_interval_start_date_pk" PRIMARY KEY("interval","start_date")
);
--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_province_id_province_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."province"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_barangay_id_barangay_id_fk" FOREIGN KEY ("barangay_id") REFERENCES "public"."barangay"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin" ADD CONSTRAINT "admin_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barangay" ADD CONSTRAINT "barangay_province_id_province_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."province"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barangay" ADD CONSTRAINT "barangay_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "city" ADD CONSTRAINT "city_province_id_province_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."province"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "civilian" ADD CONSTRAINT "civilian_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "civilian" ADD CONSTRAINT "civilian_address_id_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_schedule" ADD CONSTRAINT "collection_schedule_barangay_id_barangay_id_fk" FOREIGN KEY ("barangay_id") REFERENCES "public"."barangay"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location" ADD CONSTRAINT "location_truck_id_truck_id_fk" FOREIGN KEY ("truck_id") REFERENCES "public"."truck"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_multipliers" ADD CONSTRAINT "reward_multipliers_barangay_id_barangay_id_fk" FOREIGN KEY ("barangay_id") REFERENCES "public"."barangay"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_barangay_id_barangay_id_fk" FOREIGN KEY ("barangay_id") REFERENCES "public"."barangay"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensor_data" ADD CONSTRAINT "sensor_data_sensor_id_sensor_id_fk" FOREIGN KEY ("sensor_id") REFERENCES "public"."sensor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trash_record" ADD CONSTRAINT "trash_record_civilian_id_civilian_id_fk" FOREIGN KEY ("civilian_id") REFERENCES "public"."civilian"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trash_record" ADD CONSTRAINT "trash_record_collector_id_truck_id_fk" FOREIGN KEY ("collector_id") REFERENCES "public"."truck"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "truck" ADD CONSTRAINT "truck_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "truck_route" ADD CONSTRAINT "truck_route_truck_id_truck_id_fk" FOREIGN KEY ("truck_id") REFERENCES "public"."truck"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "water_quality_statistics" ADD CONSTRAINT "water_quality_statistics_sensor_id_sensor_id_fk" FOREIGN KEY ("sensor_id") REFERENCES "public"."sensor"("id") ON DELETE no action ON UPDATE no action;