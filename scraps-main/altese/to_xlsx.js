import fs from 'fs'
import XLSX from 'xlsx'

const json = JSON.parse(fs.readFileSync('./inputs/altese.json'))

const workbook = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(
  workbook,
  XLSX.utils.json_to_sheet(json),
  'Products'
)

const date = new Date()
const day = date.getDate()
const month = date.toLocaleString('default', { month: 'short' })
const short_month = month.charAt(0).toUpperCase() + month.slice(1, -1);

XLSX.writeFile(workbook, `./outputs/Altese ${day}-${short_month}.xlsx`)

console.log('Excel file created successfully')
