CREATE TYPE "public"."usertype" AS ENUM('admin', 'civilian', 'collector');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"usertype" "usertype",
	"username" text NOT NULL,
	"email" text NOT NULL,
	"firstname" text NOT NULL,
	"middlename" text NOT NULL,
	"lastname" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
