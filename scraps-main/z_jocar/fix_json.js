import fs, { read } from 'fs'

const inputFile = 'inputs/jocar_v2.json'

const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' })

readStream.on('data', (chunk) => {
  console.log('chunk:', chunk)
})
