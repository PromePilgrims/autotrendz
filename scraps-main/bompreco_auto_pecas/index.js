import {readFileSync, writeFileSync } from 'fs'
import { http } from './http.js'
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

function makeProduct(data, url) {
  const $ = cheerio.load(data)

  const { name, brand, image, mpn, sku, offers, description } = JSON.parse($('script[type="application/ld+json"]').html())

  if(!name) return null

  const categories = $('.breadcrumb ol li').map((_, el) => $(el).text().trim()).get().join(' > ')

  const specifications =  $('.especificacao .row').map((_, el) => {
    const key = $(el).find('div').eq(0).text().trim().toLowerCase().replace(':', '')
    if (!key.includes('código')) return

    const value = $(el).find('div').eq(1).text().trim()
    return { key, value }
  }).get()

  return {
    Name: name,
    Brand: brand.name,
    EAN: specifications.find(s => s.key.includes('barras'))?.value ?? '',
    CatalogCode: specifications.find(s => s.key.includes('catálogo'))?.value ?? '',
    PopularCode: specifications.find(s => s.key.includes('popular'))?.value ?? '',
    IndustryCode: specifications.find(s => s.key.includes('industria'))?.value ?? '',
    InternalCode: mpn,
    SKU: sku,
    Categories: categories,
    Availability: offers.availability.includes('InStock') ? 'In Stock' : 'Out of Stock',
    LowPrice: offers.lowPrice,
    HighPrice: offers.highPrice,
    Description: decode(description),
    Images: image.join(', '),
    Link: url
  }
}
