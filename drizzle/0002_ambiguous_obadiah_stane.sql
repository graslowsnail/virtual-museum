ALTER TABLE "artwork" ADD COLUMN "additional_images" text;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "object_url" text;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "is_highlight" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "artist_display_bio" text;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "object_begin_date" integer;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "object_end_date" integer;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "credit_line" text;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "classification" text;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "artist_nationality" text;--> statement-breakpoint
ALTER TABLE "artwork" ADD COLUMN "primary_image_small" text;