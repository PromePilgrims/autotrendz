// {
//   name,
//   price,
//   description,
//   images,
//   breadcrumbs,
//   availability,
//   manufacturer: {
//     name: manufacturer,
//     code: manufacturerCode
//   }
// }

export interface Breadcrumb {
  name: string
  url: string
}

export interface Product {
  name: string
  price: string
  description: string[]
  images: string[]
  breadcrumbs: Breadcrumb[]
  availability: string
  manufacturer: {
    name: string
    code: string
  }
}

export interface JSONFile {
  product: Product
  url: string
  pathname: string
}