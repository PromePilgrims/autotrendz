import { applicationProperties } from 'db/schema/application_property'
import { catalogs } from 'db/schema/catalog'
import { manufacturers } from 'db/schema/manufacturer'
import { productsToApplications } from 'db/schema/product_to_aplication'

import { relations } from 'drizzle-orm'
import { pgTable, integer, varchar } from 'drizzle-orm/pg-core'

export const applications = pgTable('applications', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  external_code: varchar('external_code', { length: 255 }).notNull(),
  catalog_id: integer().notNull().references(() => catalogs.id),
  manufacturer_id: integer().notNull().references(() => manufacturers.id),
})

export const applicationRelations = relations(applications, ({ many, one }) => ({
  properties: many(applicationProperties),
  manufacturer: one(manufacturers, {
    fields: [applications.manufacturer_id],
    references: [manufacturers.id],
  }),
  products_to_applications: many(productsToApplications),
}))
