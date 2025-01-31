import {readFileSync, writeFileSync } from 'fs'
import {http} from './http.js'
import pLimit from 'p-limit'
import * as cheerio from 'cheerio'

(async  () => {
  const urls = readFileSync('inputs/all_links.txt', 'utf-8').split('\n')

  const products = []
  let pNumber = 0
  let pError = 0

  for(const url of urls) {
    try {
      const response = await http.get(url)

      const product = makeProduct(response.data, url)
      if (!product) continue

      products.push(product)

      pNumber++
    } catch (error) {
      pError++
    }
    process.stdout.write(`\r👉 ${pNumber}/${urls.length} - ❌ ${pError.toString()}\r`)
  }

  writeFileSync('inputs/monumento_pecas.json', JSON.stringify(products, null, 2))
})()

function filterText(text) {
  return text.trim().replace(/\s+/g, ' ')
}

function makeProduct(data, url) {
  const $ = cheerio.load(data)

  const categories = $('.breadcrumbs a').map((_, el) => $(el).text()).get().join(' > ')

  const images = $('.js-product-thumb img').map((_, el) => {
    const srcSets = $(el).attr('data-srcset')
    if (!srcSets) return

    const srcSet = srcSets.split(' ')

    return 'https:' + srcSet[srcSet.length - 2]
  }).get().join(', ')

  const details = JSON.parse($('script[data-component="structured-data.page"]').text())

  return {
    Name: $('h1.js-product-name').text(),
    Brand: details.mainEntity.brand.name,
    SKU: details.mainEntity.sku,
    Quantity: parseInt($('meta[property="nuvemshop:stock"]').attr('content')),
    Categories: categories,
    Price: parseFloat($('meta[property="nuvemshop:price"]').attr('content')),
    Description: filterText($('.product-description').text()),
    Images: images,
    Link: url
  }
}
