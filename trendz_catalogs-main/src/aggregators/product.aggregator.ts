import {
  manufacturers,
  products,
  productObservations,
  productProperties,
  productPropertyTypes,
  productsToApplications,
  applications,
  applicationProperties,
  applicationPropertyTypes,
} from 'db/schema'

import { InferSelectModel } from 'drizzle-orm'

type Product = InferSelectModel<typeof products>
type ProductObservation = InferSelectModel<typeof productObservations>
type ProductProperty = InferSelectModel<typeof productProperties>
type ProductPropertyType = InferSelectModel<typeof productPropertyTypes>
type ProductsToApplication = InferSelectModel<typeof productsToApplications>
type Application = InferSelectModel<typeof applications>
type ApplicationProperty = InferSelectModel<typeof applicationProperties>
type ApplicationPropertyType = InferSelectModel<typeof applicationPropertyTypes>
type Manufacturer = InferSelectModel<typeof manufacturers>

type ProductsList = {
  products: Product
  product_observations: ProductObservation | null
  product_properties: ProductProperty | null
  product_property_types: ProductPropertyType | null
  products_to_applications: ProductsToApplication | null
  applications: Application | null
  manufacturers: Manufacturer | null
  application_properties: ApplicationProperty | null
  application_property_types: ApplicationPropertyType | null
}

export type AggregatedProduct = Product & {
  observation: string | null
  properties: (
    ProductProperty & { type: ProductPropertyType }
  )[];
  applications: (
    Application & {
    manufacturer: string
    properties: (
      ApplicationProperty & { type: ApplicationPropertyType }
    )[];
  })[]
}

export const productAggregator = (rawData: ProductsList[]): AggregatedProduct[] => {
  const productMap: Map<number, any> = new Map()

  rawData.forEach((row) => {
    const {
      products,
      product_observations,
      product_properties,
      product_property_types,
      products_to_applications,
      manufacturers,
      applications,
      application_properties,
      application_property_types,
    } = row

    // Ensure the product exists in the map
    if (!productMap.has(products.id)) {
      productMap.set(products.id, {
        ...products,
        observation: product_observations?.observation,
        properties: [],
        applications: [],
      })
    }

    const product = productMap.get(products.id)!

    // Find or add the product property to the product
    let property = product.properties.find((prop: any) => prop.id === product_properties?.id)
    if (!property) {
      property = {
        ...product_properties,
        type: product_property_types?.type,
      }
      product.properties.push(property)
    }

    // Ensure the application is linked via the join table
    if (products_to_applications?.product_id === products.id) {
      let application = product.applications.find(
        (app: any) => app.id === products_to_applications?.application_id
      );
      if (!application) {
        application = {
          ...applications,
          manufacturer: manufacturers?.name,
          properties: [],
        };
        product.applications.push(application);
      }

      // Add the application property to the application
      if (!application.properties.find((prop: any) => prop.id === application_properties?.id)) {
        application.properties.push({
          ...application_properties,
          type: application_property_types?.type,
        });
      }
    }
  })

  // Convert the map to an array
  return Array.from(productMap.values())
}
