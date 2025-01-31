CREATE TABLE "applications" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "applications_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"external_code" varchar(255) NOT NULL,
	"catalog_id" integer NOT NULL,
	"manufacturer_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "application_properties" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "application_properties_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"application_id" integer NOT NULL,
	"type_id" integer NOT NULL,
	"value" varchar(255),
	"value_complement" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "application_property_types" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "application_property_types_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	CONSTRAINT "application_property_types_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "catalogs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "catalogs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"external_code" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo" varchar(255),
	"site" varchar(255),
	"description" text,
	"address" varchar(255),
	"metadata" jsonb,
	CONSTRAINT "catalogs_external_code_unique" UNIQUE("external_code")
);
--> statement-breakpoint
CREATE TABLE "manufacturers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "manufacturers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"catalog_id" integer NOT NULL,
	"external_code" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"external_code" varchar(255) NOT NULL,
	"catalog_id" integer NOT NULL,
	"manufacturer_id" integer,
	"observation_id" integer,
	"name" varchar(255),
	"number" varchar(255),
	"number_for_search" varchar(255),
	"pcs" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_cross_references" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_cross_references_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"manufacturer_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"product_number" varchar(255),
	"product_number_for_search" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "product_observations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_observations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"product_id" integer NOT NULL,
	"observation" text
);
--> statement-breakpoint
CREATE TABLE "product_properties" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_properties_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"product_id" integer NOT NULL,
	"type_id" integer NOT NULL,
	"value" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "product_property_types" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_property_types_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	CONSTRAINT "product_property_types_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "products_to_applications" (
	"catalog_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"application_id" integer NOT NULL,
	CONSTRAINT "products_to_applications_product_id_application_id_catalog_id_pk" PRIMARY KEY("product_id","application_id","catalog_id")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_catalog_id_catalogs_id_fk" FOREIGN KEY ("catalog_id") REFERENCES "public"."catalogs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_properties" ADD CONSTRAINT "application_properties_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_properties" ADD CONSTRAINT "application_properties_type_id_application_property_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."application_property_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "manufacturers" ADD CONSTRAINT "manufacturers_catalog_id_catalogs_id_fk" FOREIGN KEY ("catalog_id") REFERENCES "public"."catalogs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_catalog_id_catalogs_id_fk" FOREIGN KEY ("catalog_id") REFERENCES "public"."catalogs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_observation_id_product_observations_id_fk" FOREIGN KEY ("observation_id") REFERENCES "public"."product_observations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_cross_references" ADD CONSTRAINT "product_cross_references_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_cross_references" ADD CONSTRAINT "product_cross_references_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_observations" ADD CONSTRAINT "product_observations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_properties" ADD CONSTRAINT "product_properties_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_properties" ADD CONSTRAINT "product_properties_type_id_product_property_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."product_property_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_to_applications" ADD CONSTRAINT "products_to_applications_catalog_id_catalogs_id_fk" FOREIGN KEY ("catalog_id") REFERENCES "public"."catalogs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_to_applications" ADD CONSTRAINT "products_to_applications_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_to_applications" ADD CONSTRAINT "products_to_applications_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "number_index" ON "products" USING btree ("number");--> statement-breakpoint
CREATE INDEX "number_for_search_index" ON "products" USING btree ("number_for_search");