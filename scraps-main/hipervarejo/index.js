import { readFileSync, writeFileSync } from 'fs'
import { http } from './http.js'
import { htmlToText } from 'html-to-text'
import pLimit from 'p-limit'

(async () => {
  const urls = readFileSync('./inputs/all_links.txt', 'utf-8').split('\n')

  const limit = pLimit(20)

  const products = []
  let pNumber = 0
  let promises = urls.map(
    url => limit(async () => {
      try {
        const response = await http.get(makeUrl(url))
        if (!response.data.length) return
        products.push(makeProduct(response.data[0]))
        pNumber++
        process.stdout.write(`\r${pNumber}/${urls.length}`)
      } catch (_) { }
    })
  )

  await Promise.all(promises)

  writeFileSync('./inputs/hipervarejo.json', JSON.stringify(products, null, 2))
})()

function filterText(text) {
  return text.trim().replace(/\s+/g, ' ')
}

function assignOrEmpty(obj, defaultValue = '') {
  return obj ? htmlToText(obj[0]) : defaultValue
}

function buildSpecifications(data) {
  const skip = ['Descrição Anymarket', 'Nome Anymarket', 'Versão', 'Aplicação', 'Código de barras (EAN)', 'Número de peça']
  const whitelist = []

  const specifications = {}

  for (const spec of data.completeSpecifications) {
    if (!whitelist.includes(spec.Name)) continue

    specifications[spec.Name] = htmlToText(spec.Values.map(value => value.Value).join(', '))
  }

  return specifications
}

function priceBoleto(installments) {
  const price = installments.find(installment => installment.PaymentSystemName.includes('Boleto'))

  if (price) return price.Value

  return ''
}

function makeProduct(data) {
  const product = {
    id: data.productId,
    Brand: data.brand,
    Name: data.productName,
    Reference: data.productReference,
    EAN: assignOrEmpty(data['Código de barras (EAN)']),
    Category: data.categories[0].slice(1, -1),
    'Vehicle Type': assignOrEmpty(data['Tipo de Veículo']).replace('para ', ''),
    'Package Content': assignOrEmpty(data['Conteúdo Da Embalagem']),
    'Application Type': assignOrEmpty(data['Tipo de Aplicação']),
    'Piece Number': filterText(assignOrEmpty(data['Número de peça'])),
    Automaker: filterText(assignOrEmpty(data['Montadora'])),
    'Automaker Code': assignOrEmpty(data['Código da Montadora']),
    'Fortbras Code': assignOrEmpty(data['Código Fortbras']),
    Seller: data.items[0].sellers[0].sellerName,
    Quantity: data.items[0].sellers[0].commertialOffer.AvailableQuantity,
    'Price Without Discount': data.items[0].sellers[0].commertialOffer.PriceWithoutDiscount,
    'Price From': data.items[0].sellers[0].commertialOffer.ListPrice,
    Price: data.items[0].sellers[0].commertialOffer.Price,
    'Price Boleto': priceBoleto(data.items[0].sellers[0].commertialOffer.Installments),
    ...buildSpecifications(data),
    Images: data.items[0].images.map(image => image.imageUrl).join(', '),
    Link: data.link,
    'Release Date': data.releaseDate,
  }

  return product
}

function makeUrl(url) {
  return `https://www.hipervarejo.com.br/api/catalog_system/pub/products/search/${(new URL(url)).pathname.slice(1)}?compSpecs=true`
}
