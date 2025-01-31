import { applications } from 'db/schema/application'
import { catalogs } from 'db/schema/catalog'
import { products } from 'db/schema/product'
import { relations } from 'drizzle-orm'

import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core'

export const productsToApplications = pgTable(
  'products_to_applications',
  {
    catalog_id: integer().notNull().references(() => catalogs.id),
    product_id: integer().notNull().references(() => products.id),
    application_id: integer().notNull().references(() => applications.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.product_id, t.application_id, t.catalog_id] })
  }),
);

export const productsToApplicationRelations = relations(productsToApplications, ({ one }) => ({
  catalog: one(catalogs, {
    fields: [productsToApplications.catalog_id],
    references: [catalogs.id],
  }),
  product: one(products, {
    fields: [productsToApplications.product_id],
    references: [products.id],
  }),
  application: one(applications, {
    fields: [productsToApplications.application_id],
    references: [applications.id],
  }),
}));
