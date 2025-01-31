import { readFileSync, writeFileSync } from 'fs'
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

function filterText(text) {
  return text.replace(/[\n\t]/g, '').trim()
}

function makeProduct(data, url) {
  const $ = cheerio.load(data)

  const { name, sku, offers, description, gtin, brand } = JSON.parse($('script[type="application/ld+json"]').html())

  if(!name) return null

  const references = $('#descricao div:contains("Referência")').first().text().split(':')
  let formattedReference = filterText(references[references.length-1])

  for (const char of ['-', '_', ' ', ',', '.', '|']) {
    if (formattedReference.indexOf(char) > -1) {
      formattedReference = filterText(references[references.length-1].split(char)[0])
    }
  }

  if(formattedReference.length > 15) {
    formattedReference = ''
  }

  return {
    Name: name,
    EAN: gtin ?? '',
    Brand: brand?.name ?? $('.product-brand').text().replace('Marca: ', '').trim(),
    Categories: $('.breadcrumb li').map((_, el) => $(el).text().trim()).get().join(' > '),
    ReferenceCode: formattedReference ?? '',
    SKU: sku,
    Availability: offers.availability.includes('InStock') ? 'In Stock' : 'Out of Stock',
    price: offers.price,
    Description: decode(description),
    Images: $('.swiper-wrapper').first().find('img.swiper-lazy').map((_, el) => $(el).attr('data-src')).get().join(', '),
    Link: url
  }
}
