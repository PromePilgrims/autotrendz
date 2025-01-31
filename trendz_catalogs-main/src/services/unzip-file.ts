import fs from 'fs'
import StreamZip from 'node-stream-zip'

export async function unzipFile(filePath: string, destinationPath: string): Promise<void> {
  return new Promise(async (resolve, _) => {
    const zip = new StreamZip.async({ file: filePath })
    await zip.extract(null, destinationPath)
    await zip.close()
    fs.unlink(filePath, () => {})

    resolve()
  })
}
