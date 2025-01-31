import {readFileSync, writeFileSync } from 'fs'
import {http} from './http.js'
import { htmlToText } from 'html-to-text'
import pLimit from 'p-limit'

(async  () => {
  const urls = readFileSync('inputs/all_links.txt', 'utf-8').split('\n')

  const limit = pLimit(100)

  const products = []
  let pNumber = 0
  let pErrors = 0
  let promises = urls.map(
    url => limit(async () => {
      try {
        const response = await http.get(makeUrl(url))
        if (!response.data.length) return
        products.push(makeProduct(response.data[0]))
        pNumber++
      } catch (error) {
        pErrors++
      }
      process.stdout.write(`\r👉 ${pNumber}/${urls.length} - ❌ ${pErrors}`)
    })
  )

  await Promise.all(promises)

  writeFileSync('inputs/marquinho_motos.json', JSON.stringify(products, null, 2))
})()

function filterText(text) {
  return text.trim().replace(/\s+/g, ' ')
}

function assignOrEmpty(obj, defaultValue = '') {
  return obj ? htmlToText(obj[0]) : defaultValue
}

function pricePix(installments) {
  const price = installments.find(installment => installment.PaymentSystemName.includes('PIX'))

  if (price) return price.Value

  return ''
}

function makeProduct(data) {
  const product = {
    id: data.productId,
    Brand: data.brand,
    Name: data.productName,
    Reference: data.productReference,
    Category: data.categories[0].slice(1, -1),
    Seller: data.items[0].sellers[0].sellerName,
    Quantity:data.items[0].sellers[0].commertialOffer.AvailableQuantity,
    'Price Without Discount': data.items[0].sellers[0].commertialOffer.PriceWithoutDiscount,
    'Price From': data.items[0].sellers[0].commertialOffer.ListPrice,
    Price: data.items[0].sellers[0].commertialOffer.Price,
    'Price PIX': pricePix(data.items[0].sellers[0].commertialOffer.Installments),
    specifications: data.skuSpecifications.map(spec => `${spec.field.name}: ${htmlToText(spec.values[0].name)}`).join(', '),
    Images: data.items[0].images.map(image => image.imageUrl).join(', '),
    Link: data.link,
    'Release Date': data.releaseDate,
  }

  return product
}

function makeUrl(url) {
  return `https://www.marquinhomotos.com.br/api/catalog_system/pub/products/search/${(new URL(url)).pathname.slice(1)}?compSpecs=true`
}
