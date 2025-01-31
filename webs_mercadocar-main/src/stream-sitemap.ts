import axios from 'axios'
import { Readable } from 'node:stream'
import { createStream, Tag } from 'sax'
import { Observable } from 'rxjs'
import { createReadStream } from 'node:fs'

async function streamUrl(url: string) {
  if(url.startsWith('http')) {
    return axios.get<Readable>(url, {
      responseType: 'stream'
    }).then((res) => {
      return res.data
    })
  }else{
    return new Promise<Readable>((resolve, reject) => {
      const stream = createReadStream(url)
      resolve(stream)
    })
  }

}

export function streamSitemap(url: string) {
  return new Observable<string>((subscriber) => {
    const saxStream = createStream()
    let currentElement: string = '';
  
    saxStream.on('opentag', (node: Tag) => {
      currentElement = node.name;
    });

    saxStream.on('text', (text: string) => {
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
