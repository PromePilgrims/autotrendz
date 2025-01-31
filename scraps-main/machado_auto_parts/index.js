import {readFileSync, writeFileSync } from 'fs'
import {http} from './http.js'
import pLimit from 'p-limit'
import * as cheerio from 'cheerio'
import { decode } from 'html-entities'

(async  () => {
  const urls = readFileSync('inputs/product_links.txt', 'utf-8').split('\n')

  const limit = pLimit(50)

  const products = []
  let pNumber = 0
  let pError = 0
  let promises = urls.map(
    url => limit(async () => {
      try {
        const response = await http.get(url)

        const product = makeProduct(response.data, url)
        if (!product) return

        products.push(product)

        pNumber++
      } catch (error) {
        pError++
      }
      process.stdout.write(`\r👉 ${pNumber}/${urls.length} - ❌ ${pError.toString()}\r`)
    })
  )

  await Promise.all(promises)

  writeFileSync('inputs/products.json', JSON.stringify(products, null, 2))
})()

function filterText(text) {
  return text.trim().replace(/\s+/g, ' ')
}

function makeProduct(data, url) {
  const $ = cheerio.load(data)

  const productLdJson = $('script[type="application/ld+json"]').filter((_, el) => {
    const json = $(el).html()
    return json.includes('"@type":"Product"')
  }).get(0).children[0].data

  const { name, manufacturer, brand, image,  sku, offers, description, gtin13 } = JSON.parse(productLdJson)

  if(!name) return null

  const categories = $('.breadcrumb li a').map((_, el) => filterText($(el).text().trim())).get().join(' > ')

  return {
    Name: name,
    EAN: gtin13,
    SKU: sku,
    Categories: categories,
    Brand: brand.name,
    Manufacturer: manufacturer.name,
    Availability: offers.availability.includes('InStock') ? 'In Stock' : 'Out of Stock',
    Price: offers.price,
    Description: filterText(decode(description)),
    Images: image.join(', '),
    Link: url
  }
}
