import { http } from './http.js'
import fs from 'fs'
import * as cheerio from 'cheerio'
import pLimit from 'p-limit'
import JSONStream from 'jsonstream'

(async() => {
  const limit = pLimit(100)

  const urls_already_inserted = fs.readFileSync('inputs/urls_already_inserted.txt', 'utf8').split('\n')
  const allUrls = fs.readFileSync('inputs/links_products.txt', 'utf8').split('\n')

  const urls = allUrls.filter(url => !urls_already_inserted.includes(url))

  const chunkSize = 15000
  let pError = 0
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize)

    const productsStream = fs.createWriteStream(`inputs/products/products_${i / chunkSize}.json`, { flags: 'a' })
    const stringifyStream = JSONStream.stringify()
    stringifyStream.pipe(productsStream)

    let pNumber = i
    const promises = chunk.map(url => limit(async () => {
      pNumber++
      process.stdout.write(`\r${pNumber}/${urls.length}`)
      try {
        if (urls_already_inserted.includes(url)) return

        const response = await http.get(url)
        const product = parseProduct(response.data, url)
        if (!product) return

        stringifyStream.write(product)
        fs.appendFile('inputs/urls_already_inserted.txt', `${url}\n`, (err) => {
          if (err) console.log(err)
        })
      } catch (error) {
        pError++
      }
      process.stdout.write(`\r👉 ${pNumber}/${urls.length} - ❌ ${pError.toString()}\r`)
    }))

    await Promise.all(promises)

    stringifyStream.end()
    productsStream.close()
  }
})()

function formatPrice(price) {
  return price.replace('R$', '').replace('.', '').replace(',', '.').trim()
}

function parseProduct(data) {
  const $ = cheerio.load(data)

  const _title = $('.product-name').first()
  const title = _title.text().trim()
  if (!title) return

  const cod = _title.parent().find('span').first().text().trim().replace('COD. ', '')

  const cats = []
  $('.breadCrumbNew').first().find('li').each((i, cat) => {
    cats.push($(cat).find('a').first().text().trim())
  })

  const images = []
  $('.img-produto-min li a').each((i, img) => {
    images.push($(img).data('image'))
  })

  return {
    Name: title,
    Cod: cod,
    Categories: cats.join(' > '),
    Brand: $('.by-brand').first().text().trim(),
    Price: formatPrice($('#product-price').first().text()),
    'Price Without Discount': formatPrice($('#product-price').eq(1).text()),
    Images: images.join(', '),
    Description: $('.container__seo').text().trim(),
    Url: $('link[rel="canonical"]').attr('href'),
  }
}
