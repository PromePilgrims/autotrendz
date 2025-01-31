import { products } from 'db/schema/product'

import { pgTable, integer, timestamp, varchar, text } from 'drizzle-orm/pg-core'

export const productObservations = pgTable('product_observations', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  product_id: integer().notNull().references(() => products.id),
  observation: text('observation'),
})
