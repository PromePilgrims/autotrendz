import { http } from './http.js'
import fs from 'fs'
import * as cheerio from 'cheerio'
import pLimit from 'p-limit'
import JSONStream from 'jsonstream'

(async() => {
  const limit = pLimit(50)

  const urls_already_inserted = fs.readFileSync('inputs/urls_already_inserted.txt', 'utf8').split('\n')
  const allUrls = JSON.parse(fs.readFileSync('inputs/link_products.json', 'utf8'))

  const urls = allUrls.filter(url => !urls_already_inserted.includes(url))

  const chunkSize = 15000
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize)

    const productsStream = fs.createWriteStream(`inputs/products/products_${i / chunkSize}_v2.json`, { flags: 'a' })
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
        fs.appendFileSync('inputs/urls_already_inserted.txt', `${url}\n`)

      } catch (error) {
        console.log(`error on ${url}`)
      }
    }))

    await Promise.all(promises)

    stringifyStream.end()
    productsStream.close()
  }
})()

function parseProduct(data, url) {
  const $ = cheerio.load(data)

  const title = $('.h1_produto').text().trim()
  if (!title) return

  const catsUl = $('ul.submenu3[data-submenu="aberto"]')
  const categories = [catsUl.parent().find('h3').text()]
  catsUl.find('li').each((_, el) => {
    categories.push($(el).text())
  })

  const suppliers = []
  $('td.menuLeft.semMenu3 ul.submenu3').eq(0).find('li').each((_, el) => {
    suppliers.push($(el).text())
  })

  const images = []
  $('#divGaleriaProdutos a').each((_, el) => {
    images.push($(el).attr('data-zoom-image'))
  })

  const models = []
  $('.ulModelos').find('li').each((_, el) => {
    models.push($(el).text())
  })

  return {
    Name: title,
    Categories: categories.join(' / '),
    Price: $('span.size6.colorTema1.bold').eq(0).text().replace('R$', '').replace(',', '.').trim(),
    'Price Without Discount': $('#ctl00_ctl00_mstContentMain_mstConteudo_mstConteudo_hValorProduto').attr('value').replace(',', '.').trim(),
    'Product Code': $('.size3.bold').eq(0).text(),
    'Available Quantity': $('span.size3.telaMenor800').eq(0).text().replace('Quantidade disponível: ', ''),
    Suppliers: suppliers.join(', '),
    Images: images.join(', '),
    Models: models.join(', '),
    Link: url,
  }
}
