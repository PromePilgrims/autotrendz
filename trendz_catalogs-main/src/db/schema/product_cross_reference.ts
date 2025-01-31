import { manufacturers } from 'db/schema/manufacturer'
import { products } from 'db/schema/product'
import { relations } from 'drizzle-orm'

import { pgTable, integer, varchar } from 'drizzle-orm/pg-core'

export const productCrossReferences = pgTable('product_cross_references', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  manufacturer_id: integer().notNull().references(() => manufacturers.id),
  product_id: integer().notNull().references(() => products.id),
  product_number: varchar('product_number', { length: 255 }),
  product_number_for_search: varchar('product_number_for_search', { length: 255 }),
})

export const productCrossReferencesRelations = relations(productCrossReferences, ({ one }) => ({
  manufacturer: one(manufacturers, {
    fields: [productCrossReferences.manufacturer_id],
    references: [manufacturers.id],
  }),
  product: one(products, {
    fields: [productCrossReferences.product_id],
    references: [products.id],
  }),
}))
