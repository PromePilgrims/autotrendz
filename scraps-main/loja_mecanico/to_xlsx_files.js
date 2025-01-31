import fs from 'fs'
import XLSX from 'xlsx'

async function main() {
  const path = 'inputs/products'
  const files = fs.readdirSync(path).filter(file => file.endsWith('.json'))

  for(const [index, file] of files.entries()) {
    const json = JSON.parse(fs.readFileSync(path + '/' + file))
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(json),
      'Products'
    )
    XLSX.writeFile(workbook, `./outputs/Loja Mecanico 12-Out (Part ${index+1}).xlsx`)
  }
}

main()
