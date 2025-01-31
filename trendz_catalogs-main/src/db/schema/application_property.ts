import { applications } from 'db/schema/application'
import { applicationPropertyTypes } from 'db/schema/application_property_type'

import { relations } from 'drizzle-orm'
import { pgTable, integer, timestamp, varchar } from 'drizzle-orm/pg-core'

export const applicationProperties = pgTable('application_properties', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  application_id: integer().notNull().references(() => applications.id),
  type_id: integer().notNull().references(() => applicationPropertyTypes.id),
  value: varchar('value', { length: 255 }),
  value_complement: varchar('value_complement', { length: 255 }),
})

export const applicationPropertiesRelations = relations(applicationProperties, ({ one }) => ({
	type: one(applicationPropertyTypes, {
		fields: [applicationProperties.type_id],
		references: [applicationPropertyTypes.id],
	}),
}))
