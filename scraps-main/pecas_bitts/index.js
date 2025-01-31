import { readFileSync, writeFileSync } from 'fs'
import { http } from './http.js'
import pLimit from 'p-limit'
import * as cheerio from 'cheerio'

(async () => {
  const urls = readFileSync('inputs/product_links_1.txt', 'utf-8').split('\n')

  const limit = pLimit(50)

  const products = []
  let pNumber = 0
  let pError = 0
  let pNotAProduct = 0
  let promises = urls.map(
    url => limit(async () => {
      try {
        const response = await http.get(url)

        const product = makeProduct(response.data, url)
        if (!product) {
          pNotAProduct++
          process.stdout.write(`\r👉 Not a product: ${pNotAProduct}\r`)
          return
        }

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

function formatPrice(price) {
  return price.replace('R$', '').replace('.', '').replace(',', '.').trim()
}

function makeProduct(data, url) {
  const $ = cheerio.load(data)

  const title = $('meta[property="og:title"]').attr('content')
  if (!title) return null

  const categories = $('.breadcrumbs li').map((_, el) => filterText($(el).text())).get().join(' > ')

  const specifications = $('table#product-attribute-specs-table tr').map((_, el) => {
    const key = $(el).find('th').text().trim()
    const value = $(el).find('td').text().trim()
    return { key, value }
  }).get()

  return {
    Name: title,
    EAN: specifications.find(spec => spec.key == 'Ean')?.value ?? '',
    Brand: specifications.find(spec => spec.key == 'Fabricante')?.value ?? '',
    Code: specifications.find(spec => spec.key == 'Código do Fabricante')?.value ?? '',
    SimilarCodes: specifications.find(spec => spec.key == 'Códigos Similares')?.value ?? '',
    SKU: $('div[itemprop="sku"]').text(),
    Availability: $('.info-estoque').length > 0 ? 'In stock' : 'Out of stock',
    Categories: categories,
    Price: $('meta[property="product:price:amount"]').attr('content'),
    'Price Boleto': formatPrice(filterText($('.cc1x span').text())),
    Description: filterText($('#attributedescription').text()),
    Images: $('.product.item-image.imgzoom').map((_, el) => $(el).attr('data-zoom')).get().join(', '),
    Link: url
  }
}
