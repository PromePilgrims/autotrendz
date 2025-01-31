import fs from 'fs'
import JSONStream from 'jsonstream'
import { Transform } from 'stream'
import XLSX from 'xlsx'

const getJSONs = (files, path, objectToRowStream) =>
  new Promise((resolve, reject) => {
    let processedFiles = 0

    for (const file of files) {
      const readable = fs.createReadStream(`${path}/${file}`, { encoding: 'utf8' })
      const jsonStream = readable.pipe(JSONStream.parse('*'))

      jsonStream.on('data', (data) => {
        if (!objectToRowStream.write(data)) {
          jsonStream.pause()
          objectToRowStream.once('drain', () => jsonStream.resume())
        }
      })
      jsonStream.on('end', () => {
        readable.close()
        readable.destroy()
        processedFiles++
        if (processedFiles == files.length) {
          resolve()
        }
      })
      jsonStream.on('error', (err) => reject(err))
      readable.on('error', (err) => reject(err))
    }
  })

async function main() {
  const path = 'inputs/products'
  const files = fs.readdirSync(path)
  const writable = fs.createWriteStream('inputs/loja_mecanico.csv')

  const objectToRowStream = new Transform({
    writableObjectMode: true,
    transform(chunk, _, callback) {
      const sheet = XLSX.utils.json_to_sheet([Object.values(chunk)], { skipHeader: true })
      const csv = XLSX.utils.sheet_to_csv(sheet)
      this.push(csv + '\n')
      callback()
    },
  })

  objectToRowStream.pipe(writable)
  objectToRowStream.write(['Name', 'Cod', 'Categories', 'Brand', 'Price', 'Price Without Discount', 'Images', 'Description', 'Url'])
  await getJSONs(files, path, objectToRowStream)
  objectToRowStream.end()

  writable.on('finish', () => {
    console.log('Writing finished')
    process.exit(0)
  })
}

main()