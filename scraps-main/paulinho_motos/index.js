import { readFileSync, writeFileSync } from 'fs'
import { http } from './http.js'
import { htmlToText } from 'html-to-text'
import pLimit from 'p-limit'
import * as cheerio from 'cheerio'

(async () => {
  const urls = readFileSync('./inputs/all_links.txt', 'utf-8').split('\n')

  const limit = pLimit(20)

  const products = []
  let pNumber = 0
  let promises = urls.map(
    url => limit(async () => {
      try {
        const response = await http.get(url)
        if (!response.data) {
          console.error('No data', url)
          return
        }
        products.push(makeProduct(response.data, url))
        pNumber++
        process.stdout.write(`\r${pNumber}/${urls.length}`)
      } catch (_) { }
    })
  )

  await Promise.all(promises)

  writeFileSync('./inputs/paulinho.json', JSON.stringify(products, null, 2))
})()

function makeProduct(data, url) {
  const $ = cheerio.load(data)

  const categories = []
  $('.fbits-breadcrumb a').each((i, el) => {
    if (i == 0) return
    categories.push($(el).text().trim())
  })

  const images = []
  $('ul#galeria a').each((_, el) => {
    images.push($(el).attr('data-image').split('?')[0])
  })

  const inStock = $('meta[property="product:availability"]').attr('content') == 'em estoque'

  const product = {
    Name: $('h1.title').text(),
    InStock: inStock ? 'In stock' : 'Out of stock',
    StockQuantity: !inStock ? 0 : parseInt($('.fbits-estoque b').text().replace('itens', '').trim()),
    Category: categories.join(' > '),
    SKU: $('.fbits-sku').text().replace('SKU ', '').trim(),
    Brand: $('meta[property="product:brand"]').attr('content') ?? '',
    Price: $('.fbits-parcela').eq(0).text().replace('R$', '').replace(',', '.').trim(),
    PriceFrom: parseFloat($('meta[property="product:price:amount"]').attr('content')),
    Images: images.join(', '),
    Infos: htmlToText($('.conteudoAbasProduto').eq(0).html()),
    Specifications: htmlToText($('.conteudoAbasProduto').eq(1).html()),
    Link: url,
  }

  return product
}

