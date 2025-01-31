const fs = require('fs')
var glob = require('glob')

const allTxtFiles = glob.sync('**/inputs/**/*.txt')
const allJsonFiles = glob.sync('**/inputs/**/*.json')
const allExcelFiles = glob.sync('**/outputs/**/*.xlsx')
const allCsvFiles = glob.sync('**/outputs/**/*.csv')

const toBeDeleted = [...allTxtFiles, ...allJsonFiles, ...allExcelFiles, ...allCsvFiles]

console.log(`Files to be deleted = ${toBeDeleted.length}`)

for (const file of toBeDeleted) {
  fs.unlinkSync(file)
}
