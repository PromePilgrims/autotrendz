import fs from 'fs'
import XLSX from 'xlsx'

const json = JSON.parse(fs.readFileSync('inputs/products.json'))

const workbook = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(
  workbook,
  XLSX.utils.json_to_sheet(json),
  'Products'
)
XLSX.writeFile(workbook, 'outputs/Machado Auto Parts 5-Jul.xlsx')

console.log('Excel file created successfully')
