import fs from 'fs'
import XLSX from 'xlsx'

const json = JSON.parse(fs.readFileSync('inputs/products.json'))

const workbook = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(
  workbook,
  XLSX.utils.json_to_sheet(json),
  'Products'
)

const current_date = new Date()
XLSX.writeFile(workbook, `outputs/Pecas Bitts ${current_date.getDate()}-${current_date.toLocaleDateString('en', { month: 'short' })}.xlsx`)

console.log('Excel file created successfully')
