import { readFileSync, writeFileSync } from 'fs'
import { http } from './http.js'
import pLimit from 'p-limit'
import * as cheerio from 'cheerio'

(async () => {
  const urls = readFileSync('./inputs/all_links.txt', 'utf-8').split('\n')

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
        console.log(error)
      }
      process.stdout.write(`\r👉 ${pNumber}/${urls.length} - ❌ ${pError.toString()}\r`)
    })
  )

  await Promise.all(promises)

  writeFileSync('inputs/molina.json', JSON.stringify(products, null, 2))
})()

function filterText(text) {
  return text.trim().replace(/\s+/g, ' ')
}

function makeProduct(data, url) {
  const $ = cheerio.load(data)

  const ldJson = JSON.parse($('script[type="application/ld+json"]').html())
  if (!ldJson) return null

  const title = ldJson.name
  if (!title) return null

  const categories = $('.breadcrumb a').map((_, el) => $(el).text()).get().join(' > ')

  return {
    Name: title,
    Brand: ldJson.brand.name ?? '',
    SKU: $('.product-sku.ref').text(),
    Model: $('.product-brand:contains("Modelo")').text().split(':')[1].trim(),
    Availability: ldJson.offers.availability.includes('InStock') ? 'In Stock' : 'Out of Stock',
    Categories: categories,
    Price: ldJson.offers.price,
    Description: filterText($('#descricao').first().text()),
    Images: $('.product-thumbs img').map((_, el) => $(el).attr('src')).get().join(', '),
    Link: url
  }
}
