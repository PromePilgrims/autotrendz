import { manufacturers } from 'db/schema/manufacturer'
import { productProperties } from 'db/schema/product_property'
import { productObservations } from 'db/schema/product_observations'
import { productsToApplications } from 'db/schema/product_to_aplication'
import { productGroups } from 'db/schema/product_group'
import { catalogs } from 'db/schema/catalog'

import { relations } from 'drizzle-orm'
import { pgTable, integer, varchar, timestamp, index, text } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  external_code: varchar('external_code', { length: 255 }).notNull(),
  catalog_id: integer().notNull().references(() => catalogs.id),
  manufacturer_id: integer().references(() => manufacturers.id),
  observation_id: integer().references(() => productObservations.id),
  group_id: integer().references(() => productGroups.id),
  name: varchar('name', { length: 255 }),
  number: varchar('number', { length: 255 }),
  number_for_search: varchar('number_for_search', { length: 255 }),
  pcs: text('pcs'),
  created_at: timestamp().defaultNow(),
}, (t) => ({
  number_index: index('number_index').on(t.number),
  number_for_search_index: index('number_for_search_index').on(t.number_for_search),
}))

export const productsRelations = relations(products, ({ many, one }) => ({
  manufacturer: one(manufacturers),
  group: one(productGroups),
  observation: one(productObservations),
	properties: many(productProperties),
  products_to_applications: many(productsToApplications),
}))
