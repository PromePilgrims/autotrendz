import XLSXTransformStream from 'xlsx-write-stream'
import { Readable } from 'stream'
import pLimit from 'p-limit'

const limit = pLimit(1)

export const writeToXlsx = (links) => {
  // Create a readable stream that fetches and pushes data to the stream
  const inputStream = new Readable({
    objectMode: true,
    read() {
      // Fetch data from all pages in parallel
      const promises = []
      for (const link of links) {
        promises.push(limit(() => fetchData(link)))
      }

      // Wait for all promises to resolve
      Promise.all(promises)
        .then(results => {
          const headers = Object.keys(results[0])
          this.push(headers)

          // Push data from all pages to the stream
          for (const item of results) {
            this.push(Object.values(item))
          }

          // Signal end of data
          this.push(null)
        })
        .catch(error => {
          console.error('Error processing data:', error)
          this.emit('error', error)
        })
    }
  })

  // Create a writable stream to the desired output file
  const outputStream = fs.createWriteStream('Jocar 1-Jun.xlsx')

  // Pipe the data through XLSXTransformStream and then to the output file
  inputStream
    .pipe(new XLSXTransformStream())
    .pipe(outputStream)
    .on('finish', () => {
      console.log('Workbook created successfully!')
    })
    .on('error', (error) => {
      console.error('Error creating workbook:', error)
    })

  // Optionally handle the close event if needed
  outputStream.on('close', () => {
    console.log('Stream closed.')
  })

  // Ensure that the writable stream is properly ended
  outputStream.on('finish', () => {
    console.log('Output stream finished.')
    outputStream.close() // Close the file stream
  })

  // Handle errors
  inputStream.on('error', (error) => {
    console.error('Error with input stream:', error)
    outputStream.destroy() // Destroy the output stream on error
  })

  outputStream.on('error', (error) => {
    console.error('Error with output stream:', error)
    inputStream.destroy() // Destroy the input stream on error
  })
}
