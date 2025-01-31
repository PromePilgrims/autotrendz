import fs from 'fs'
import path from 'path'

export function findDBFiles(directory: string) {
  const dbFiles: string[] = []

  fs.readdirSync(directory).forEach(file => {
    const filePath = path.join(directory, file)

    if (fs.statSync(filePath).isDirectory()) {
      dbFiles.push(...findDBFiles(filePath))
    } else if (path.extname(file) == '.db') {
      dbFiles.push(filePath)
    }
  })

  return dbFiles
}