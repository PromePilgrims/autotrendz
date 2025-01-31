import XLSX from 'xlsx'
import fs from 'fs'

const filename = 'hipervarejo'

const json = JSON.parse(fs.readFileSync(`./inputs/${filename}.json`))

const workbook = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(
  workbook,
  XLSX.utils.json_to_sheet(json),
  'Products'
)
XLSX.writeFile(workbook, `./outputs/${filename}.xlsx`)

console.log('Excel file created successfully')
