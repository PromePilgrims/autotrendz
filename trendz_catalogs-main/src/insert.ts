import { db } from 'db'
import {
  catalogs,
  manufacturers,
  products,
  productCrossReferences,
  productObservations,
  productProperties,
  productPropertyTypes,
  productsToApplications,
  applications,
  applicationProperties,
  applicationPropertyTypes,
} from 'db/schema'
import { mappings } from 'map'

import slugify from 'slugify'
import { getDb } from 'sqlitedb'
import { eq } from 'drizzle-orm'

async function main() {
  const catalog_name = slugify('Tecfil', { lower: true }) as keyof typeof mappings

  if (!mappings[catalog_name])
      throw new Error(`Catalog ${catalog_name} is not mapped`)

  const product_properties = Object.entries(mappings[catalog_name].product_properties)
  const application_properties = Object.entries(mappings[catalog_name].application_properties)

  const { metadata, sqliteDb, close } = getDb({ name: catalog_name })

  // Create catalog
  const catalog = await db
    .insert(catalogs)
    .values({
      name: metadata.nome,
      external_code: metadata.codigo_catalogo.toString(),
      site: metadata.site,
      description: metadata.sobre_empresa,
      address: metadata.endereco,
      metadata: metadata
    })
    .returning({ id: catalogs.id })

  const catalog_id = catalog[0].id

  const result = await db.transaction(async (transaction) => {
    // Create manufacturer
    const allManufacturers = await transaction
      .insert(manufacturers)
      .values(
        sqliteDb
          .prepare(`SELECT * FROM FABRICANTE`)
          .all()
          .map((m: any) => ({ catalog_id, external_code: m.CodigoFabricante, name: m.DescricaoFabricante }))
      )
      .returning()

    const sqliteProducts = sqliteDb
      .prepare(`SELECT * FROM PRODUTO`)
      .all() as any[]

    for (const sqliteProduct of sqliteProducts) {
      // Create product
      const product = await transaction
        .insert(products)
        .values({
          catalog_id: catalog_id,
          external_code: sqliteProduct.CodigoProduto,
          name: sqliteProduct.DescricaoProduto,
          number: sqliteProduct.NumeroProduto,
          number_for_search: sqliteProduct.NumeroProdutoPesq,
          pcs: sqliteProduct.PCs
        })
        .returning()

      // Create product observation
      const sqliteProductObservations = sqliteDb
        .prepare(`SELECT * FROM PRODUTO_OBS WHERE CodigoProduto = '${sqliteProduct.CodigoProduto}'`)
        .all()
        .map((r: any) => ({
          product_id: product[0].id,
          observation: r.Observacao,
        }))

      if (sqliteProductObservations.length) {
        await transaction
        .insert(productObservations)
        .values(sqliteProductObservations )
      }

      // Create product's properties and product property types
      for (const [type, fieldName] of product_properties) {
        const key = slugify(type, { lower: true })

        // Check if product property type exists
        let newProductPropertyType: { id: number }[]
        newProductPropertyType = await transaction
          .select()
          .from(productPropertyTypes)
          .where(eq(productPropertyTypes.key, key))

        // Create product property type if it doesn't exist
        if (!newProductPropertyType.length)
          newProductPropertyType = await transaction
            .insert(productPropertyTypes)
            .values({ key, type })
            .returning({ id: productPropertyTypes.id })

        // Create product property if it has value
        await transaction
          .insert(productProperties)
          .values({
            product_id: product[0].id,
            type_id: newProductPropertyType[0].id,
            value: sqliteProduct[fieldName] ?? null,
          })
      }
    }

    for (const manufacturer of allManufacturers) {
        const sqliteApplications = sqliteDb
          .prepare(`SELECT * FROM APLICACAO WHERE CodigoFabricante = '${manufacturer.external_code}'`)
          .all() as any[]

      for (const sqliteApplication of sqliteApplications) {
        const application = await transaction
          .insert(applications)
          .values({
            external_code: sqliteApplication.CodigoAplicacao,
            catalog_id,
            manufacturer_id: manufacturer.id,
          })
          .returning()

        for (const [type, fieldsName] of application_properties) {
          const key = slugify(type, { lower: true })

          // Create application property type
          let newApplicationPropertyType: { id: number }[]
          newApplicationPropertyType = await transaction
            .select()
            .from(applicationPropertyTypes)
            .where(eq(applicationPropertyTypes.key, key))

          if (!newApplicationPropertyType.length)
            newApplicationPropertyType = await transaction
              .insert(applicationPropertyTypes)
              .values({ key, type })
              .returning({ id: applicationPropertyTypes.id })

          // Create application property
          await transaction
            .insert(applicationProperties)
            .values({
              application_id: application[0].id,
              type_id: newApplicationPropertyType[0].id,
              value: sqliteApplication[fieldsName[0]] ?? null,
              value_complement: fieldsName.length > 1
                ? sqliteApplication[fieldsName[1]]
                : null,
            })
        }
      }
    }
  })

  const result2 = await db.transaction(async (transaction) => {
    const allProducts = await transaction.select().from(products)
    const allManufacturers = await transaction.select().from(manufacturers)

    // Create cross references
    for (const product of allProducts) {
      const sqliteProductCrossReferences = sqliteDb
        .prepare(`SELECT * FROM REFERENCIACRUZADA WHERE CodigoProduto = '${product.external_code}'`)
        .all() as any[]

        for (const sqliteProductCrossReference of sqliteProductCrossReferences) {
          const manufacturer_id = allManufacturers.find(m => m.catalog_id == catalog_id && m.external_code == sqliteProductCrossReference.CodigoFabricante)?.id

          if (!manufacturer_id) continue

          await transaction
            .insert(productCrossReferences)
            .values({
              manufacturer_id,
              product_id: product.id,
              product_number: sqliteProductCrossReference.NumeroProduto,
              product_number_for_search: sqliteProductCrossReference.NumeroProdutoPesq,
            })
        }
    }

    // Create product's applications relations
    const sqliteProductApplicationRelations = sqliteDb
      .prepare(`SELECT * FROM PRODUTO_APLICACAO`)
      .all() as any[]

      for (const productApplication of sqliteProductApplicationRelations) {
        const product = await transaction
          .select({ id: products.id, external_code: products.external_code })
          .from(products)
          .where(eq(products.external_code, productApplication.CodigoProduto))

        const application = await transaction
          .select({ id: applications.id, external_code: applications.external_code })
          .from(applications)
          .where(eq(applications.external_code, productApplication.CodigoAplicacao))

        if (!product.length || !application.length) continue

        await transaction
          .insert(productsToApplications)
          .values({
            catalog_id,
            product_id: product[0].id,
            application_id: application[0].id,
          })
      }
  })

  close()

  console.log(result)
  console.log(result2)
}

main()
