import { Readable } from 'stream'
import XLSXTransformStream from 'xlsx-write-stream'
import fs from 'fs'
import { http } from './http.js'
import pLimit from 'p-limit'
import cheerio from 'cheerio'

const limit = pLimit(1)
const links  = fs.readFileSync('inputs/jocar_links.txt', 'utf8').split('\n').filter(Boolean)

function parseProduct(data, url) {
  const $ = cheerio.load(data)

  const title = $('.h1_produto').text().trim()
  if (!title) return {}

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

// Function to fetch data from the API
async function fetchData(link) {
  try {
    const response = await http.get(link)
    return parseProduct(response.data, link)
  } catch (error) {
    console.error('Error fetching data from API:', error.message)
    return []
  }
}

// Create a readable stream that fetches and pushes data to the stream
const inputStream = new Readable({
  objectMode: true,
  read() {
    // Fetch data from all pages in parallel
    const promises = []
    for (const link of links) {
      promises.push(limit(() => fetchData(link)))
    }

    // Wait for all promises to resolve
    Promise.all(promises)
      .then(results => {
        const headers = Object.keys(results[0])
        this.push(headers)

        // Push data from all pages to the stream
        for (const item of results) {
          this.push(Object.values(item))
        }

        // Signal end of data
        this.push(null)
      })
      .catch(error => {
        console.error('Error processing data:', error)
        this.emit('error', error)
      })
  }
})

// Create a writable stream to the desired output file
const outputStream = fs.createWriteStream('Jocar 1-Jun.xlsx')

// Pipe the data through XLSXTransformStream and then to the output file
inputStream
  .pipe(new XLSXTransformStream())
  .pipe(outputStream)
  .on('finish', () => {
    console.log('Workbook created successfully!')
  })
  .on('error', (error) => {
    console.error('Error creating workbook:', error)
  })

// Optionally handle the close event if needed
outputStream.on('close', () => {
  console.log('Stream closed.')
})

// Ensure that the writable stream is properly ended
outputStream.on('finish', () => {
  console.log('Output stream finished.')
  outputStream.close() // Close the file stream
})

// Handle errors
inputStream.on('error', (error) => {
  console.error('Error with input stream:', error)
  outputStream.destroy() // Destroy the output stream on error
})

outputStream.on('error', (error) => {
  console.error('Error with output stream:', error)
  inputStream.destroy() // Destroy the input stream on error
})
