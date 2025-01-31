import { applications } from 'db/schema/application'
import { products } from 'db/schema/product'

import { relations } from 'drizzle-orm'
import { pgTable, integer, varchar, jsonb, text } from 'drizzle-orm/pg-core'

export const catalogs = pgTable('catalogs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  external_code: varchar('external_code', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  logo: varchar('logo', { length: 255 }),
  site: varchar('site', { length: 255 }),
  description: text('description'),
  address: varchar('address', { length: 255 }),
  metadata: jsonb('metadata'),
})

export const catalogsRelations = relations(catalogs, ({ many }) => ({
  products: many(products),
  applications: many(applications),
}))
