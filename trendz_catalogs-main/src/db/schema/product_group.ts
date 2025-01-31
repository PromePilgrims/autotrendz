import { pgTable, integer,  varchar } from 'drizzle-orm/pg-core'

export const productGroups = pgTable('product_groups', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
})
