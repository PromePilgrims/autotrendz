import { db } from 'db'
import {
  catalogs,
  manufacturers,
  products,
  productObservations,
  productProperties,
  productPropertyTypes,
  productsToApplications,
  applications,
  applicationProperties,
  applicationPropertyTypes,
  productCrossReferences,
} from 'db/schema'

import { aliasedTable, and, eq } from 'drizzle-orm'
import xlsx from 'xlsx'

async function main() {
  const catalog = await db.select().from(catalogs).limit(2)

  const cross_reference_manufactures = aliasedTable(manufacturers, "cross_reference_manufactures")
  const applications_manufacturers = aliasedTable(applications, "applications_manufacturers")

  const products_list = await db
    .select()
    .from(products)
    .where(
      and(eq(products.catalog_id, catalog[0].id), eq(products.number, 'ACP357')) // ACP357 - PSC461
    )
    .leftJoin(productCrossReferences, eq(productCrossReferences.product_id, products.id))
    .leftJoin(cross_reference_manufactures, eq(cross_reference_manufactures.id, productCrossReferences.manufacturer_id))
    // .leftJoin(productProperties, eq(productProperties.product_id, products.id))
    // .leftJoin(productPropertyTypes, eq(productPropertyTypes.id, productProperties.type_id))
    // .leftJoin(productsToApplications, eq(products.id, productsToApplications.product_id))
    // .leftJoin(applications, eq(applications.id, productsToApplications.application_id))
    // .leftJoin(applications_manufacturers, eq(applications_manufacturers.id, applications.manufacturer_id))
    // .leftJoin(applicationProperties, eq(applicationProperties.application_id, applications.id))
    // .leftJoin(applicationPropertyTypes, eq(applicationPropertyTypes.id, applicationProperties.type_id))
    .leftJoin(productObservations, eq(productObservations.product_id, products.id))

  const pieces = products_list.map(items => ({
    Catálogo: catalog[0].name,
    Peça: items.products.name,
    'Código da Peça': items.products.number,
    'Ref.Fabricante': items.cross_reference_manufactures.name,
    'Ref.Código da Peça': items.product_cross_references.product_number,
    Observações: items.product_observations.value ?? '',
    // [`Propriedade_${items.product_property_types.type}`]: items.product_properties.value,
    // 'Aplicação_Fabricante': items.applications_manufacturers.name,
    // [`Aplicação_${items.application_property_types.type}`]: items.application_properties.value,
    // [`Aplicação_${items.application_property_types.type}_Complemento`]: items.application_properties.value_complement.length == 1 ? '' : items.application_properties.value_complement,
  }))

  const wb = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(pieces), 'ACP357')
  xlsx.writeFile(wb, 'Tecfil - ACP357.xlsx')
}

main()
