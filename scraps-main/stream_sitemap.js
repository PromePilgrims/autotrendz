import axios from 'axios'
import { Readable } from 'node:stream'
import { createStream } from 'sax'
import { Observable } from 'rxjs'
import { createReadStream } from 'node:fs'

async function streamUrl(url) {
  if(url.startsWith('http')) {
    return axios.get<Readable>(url, {
      responseType: 'stream'
    }).then((res) => {
      return res.data
    })
  }else{
    return new Promise<Readable>((resolve) => {
      const stream = createReadStream(url)
      resolve(stream)
    })
  }
}

export function streamSitemap(url) {
  return new Observable<string>((subscriber) => {
    const saxStream = createStream()
    let currentElement = '';

    saxStream.on('opentag', (node) => {
      currentElement = node.name;
    });

    saxStream.on('text', (text) => {
      if (currentElement === 'LOC') {
        subscriber.next(text.trim());
      }
    });

    saxStream.on('end', () => {
      subscriber.complete();
    });

    saxStream.on('error', (error) => {
      subscriber.error(error);
    });

    streamUrl(url).then((reader) => {
      reader.pipe(saxStream)
    }).catch((err) => {
      subscriber.error(err);
    })
  })
}
