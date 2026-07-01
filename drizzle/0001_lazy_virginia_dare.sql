CREATE TABLE "page_views" (
	"id" serial PRIMARY KEY NOT NULL,
	"path" varchar(512) NOT NULL,
	"user_agent" text,
	"referer" text,
	"ip_hash" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL
);
