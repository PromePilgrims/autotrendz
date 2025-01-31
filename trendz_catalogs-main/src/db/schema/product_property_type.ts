import { pgTable, integer, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core'

export const productPropertyTypes = pgTable('product_property_types', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  key: varchar('key', { length: 255 }).unique().notNull(),
  type: varchar('type', { length: 255 }).notNull(),
})
