import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core'

export const applicationPropertyTypes = pgTable('application_property_types', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  key: varchar('key', { length: 255 }).unique().notNull(),
  type: varchar('type', { length: 255 }).notNull(),
})
