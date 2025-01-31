import { catalogs } from 'db/schema/catalog'
import { relations } from 'drizzle-orm'
import { pgTable, integer, varchar, jsonb } from 'drizzle-orm/pg-core'

export const manufacturers = pgTable('manufacturers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  catalog_id: integer().notNull().references(() => catalogs.id),
  external_code: varchar('external_code', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
})

export const manufacturersRelations = relations(manufacturers, ({ one }) => ({
  catalog: one(catalogs),
}))
