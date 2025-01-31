import fs from 'fs'
import XLSX from 'xlsx'

const json = JSON.parse(fs.readFileSync('inputs/marquinho_motos.json'))

const workbook = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(
  workbook,
  XLSX.utils.json_to_sheet(json),
  'Products'
)
XLSX.writeFile(workbook, 'outputs/marquinho_motos.xlsx')

console.log('Excel file created successfully')
