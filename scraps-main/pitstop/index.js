import { readFileSync } from 'fs'
import { http } from './http.js'
import { htmlToText } from 'html-to-text'
import pLimit from 'p-limit'
import { Readable } from 'stream'
import XLSXTransformStream from 'xlsx-write-stream'
import fs from 'fs'

const urls = readFileSync('inputs/product_links.txt', 'utf-8').split('\n')
const chunkSize = 70000
const urlChunks = urls.reduce((acc, url, index) => {
  const chunkIndex = Math.floor(index / chunkSize)
  if (!acc[chunkIndex]) acc[chunkIndex] = []
  acc[chunkIndex].push(url)
  return acc
}, [])

const limit = pLimit(200)

let pNumber = 0
let pError = 0
let pTotal = urls.length
let pTotalChunks = urlChunks.length

export const writeToXlsx = (links, pCurrentChunk, file_name) => {
  const inputStream = new Readable({
    objectMode: true,
    read() {
      const promises = []
      for (const link of links) {
        promises.push(limit(() => fetchData(link, pCurrentChunk)))
      }

      Promise.all(promises)
        .then(results => {
          const headers = Object.keys(results[0])
          this.push(headers)

          for (const item of results) {
            if (!item) continue
            this.push(Object.values(item))
          }

          this.push(null)
        })
        .catch(error => {
          console.error('Error processing data:', error)
          this.emit('error', error)
        })
    }
  })

  const outputStream = fs.createWriteStream(file_name)

  inputStream
    .pipe(new XLSXTransformStream({  }))
    .pipe(outputStream)

  outputStream
    .on('finish', () => {
      outputStream.close()
    })
    .on('error', () => {
      inputStream.destroy()
    })
}

const fetchData = async (link, pCurrentChunk) => {
  const log = () => process.stdout.write(`\r👉 ${pNumber}/${pTotal} - 📁 ${pCurrentChunk}/${pTotalChunks} - ❌ ${pError} errors\r`)

  try {
    const response = await http.get(makeUrl(link))
    const product = makeProduct(response.data[0])

    pNumber++
    log()

    return product
  } catch (error) {
    pError++
    log()
    return null
  }
}

function assignOrEmpty(obj, defaultValue = '') {
  return obj ? htmlToText(obj[0]) : defaultValue
}

function priceBoleto(installments) {
  const price = installments.find(installment => installment.PaymentSystemName.includes('Boleto'))

  if (price) return price.Value

  return ''
}

function makeProduct(data) {
  return {
    SKU: data.items[0].itemId,
    Brand: data.brand,
    Name: data.productName,
    Reference: data.items[0].referenceId ? data.items[0].referenceId[0].Value.split('.').pop() : '',
    InternalReference: data.productReference,
    EAN: assignOrEmpty(data.items[0].ean),
    Category: data.categories[0].slice(1, -1),
    Seller: data.items[0].sellers[0].sellerName,
    Quantity:data.items[0].sellers[0].commertialOffer.AvailableQuantity,
    'Price Without Discount': data.items[0].sellers[0].commertialOffer.PriceWithoutDiscount,
    'Price From': data.items[0].sellers[0].commertialOffer.ListPrice,
    Price: data.items[0].sellers[0].commertialOffer.Price,
    'Price Boleto': priceBoleto(data.items[0].sellers[0].commertialOffer.Installments),
    Images: data.items[0].images.map(image => image.imageUrl).join(', '),
    Link: data.link,
    'Release Date': data.releaseDate,
  }
}

function makeUrl(url) {
  return `https://www.pitstop.com.br/api/catalog_system/pub/products/search/${(new URL(url)).pathname.slice(1)}?compSpecs=true`
}

for (const [index, chunk] of urlChunks.entries()) {
  writeToXlsx(chunk, index+1, `outputs/Pitstop (Part ${index+1}).xlsx`)
}
