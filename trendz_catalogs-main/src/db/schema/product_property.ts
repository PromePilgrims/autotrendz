import { products } from 'db/schema/product'
import { productPropertyTypes } from 'db/schema/product_property_type'

import { relations } from 'drizzle-orm'
import { pgTable, integer, timestamp, varchar } from 'drizzle-orm/pg-core'

export const productProperties = pgTable('product_properties', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  product_id: integer().notNull().references(() => products.id),
  type_id: integer().notNull().references(() => productPropertyTypes.id),
  value: varchar('value', { length: 255 }),
})

export const productPropertiesRelations = relations(productProperties, ({ one }) => ({
	type: one(productPropertyTypes, {
		fields: [productProperties.type_id],
		references: [productPropertyTypes.id],
	}),
}))
