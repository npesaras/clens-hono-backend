CREATE TABLE "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"street" text NOT NULL,
	"barangay" text NOT NULL,
	"city" text NOT NULL,
	"province" text NOT NULL,
	"zip_code" text NOT NULL,
	"country" text DEFAULT 'Philippines' NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "civilian" ADD CONSTRAINT "civilian_address_id_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;