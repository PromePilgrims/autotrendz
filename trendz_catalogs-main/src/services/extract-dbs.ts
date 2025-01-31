import path from 'path'
import { findDBFiles } from '../utils'
import fs from 'fs'

function getFileName(filePath: string) {
  return filePath.split('/').pop()
}

export async function extractDbs(destinationPath: string, destinationDbFolder: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const dbFiles = findDBFiles(destinationPath)
    const rootPath = path.join(path.dirname(require.main!.filename), '../..')

    fs.mkdirSync(rootPath + '/' + destinationDbFolder, { recursive: true })

    for (const dbFile of dbFiles) {
      const source = dbFile
      const dest = rootPath + `/${destinationDbFolder}/` + getFileName(dbFile)

      fs.renameSync(source, dest)
    }

    resolve()

    fs.rm(destinationPath, { recursive: true  }, (err) => {
      if(err) reject(err)
    })
  })
}
