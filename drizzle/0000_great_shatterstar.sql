CREATE TABLE IF NOT EXISTS "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"category" varchar(100) NOT NULL,
	"author" varchar(150) DEFAULT 'Low Wah Chin (Ava Rachel)' NOT NULL,
	"read_time" varchar(50) DEFAULT '3 min read' NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"cover_image_url" text,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"practice_area" varchar(150) NOT NULL,
	"preferred_date" varchar(100),
	"message" text NOT NULL,
	"status" varchar(50) DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"bio" text NOT NULL,
	"photo_url" text,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_name" varchar(255) NOT NULL,
	"quote" text NOT NULL,
	"practice_area" varchar(150) NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"source" varchar(150) DEFAULT 'Trusted Malaysia' NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL
);
