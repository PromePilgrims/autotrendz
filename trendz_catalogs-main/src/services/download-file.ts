import axios from 'axios';
import fs from 'fs';

async function getContentLength(url: string): Promise<number> {
  const response = await axios.head(url);
  const contentLength = response.headers['content-length'];
  return contentLength ? Number(contentLength) : 0;
}

function logPercentage(downloaded: number, contentLength: number) {
  process.stdout.write(`\r${Math.round((downloaded / contentLength) * 100)}%`);
}

export async function downloadFile(fileName: string, downloadUrl: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const file = fs.createWriteStream(fileName);
    const contentLength = await getContentLength(downloadUrl);

    let canLog = true;
    let timer = setInterval(() => {
      canLog = true;
    }, 3000);

    try {
      const response = await axios.get(downloadUrl, {
        responseType: 'stream',
      });

      let downloaded = 0;

      response.data.on('data', (chunk: Buffer) => {
        downloaded += chunk.length;
        if (canLog) {
          canLog = false;
          logPercentage(downloaded, contentLength);
        }
      });

      response.data.pipe(file);

      file.on('finish', () => {
        file.close();
        logPercentage(downloaded, contentLength);
        clearInterval(timer);
        resolve();
      });
    } catch (err: any) {
      fs.unlink(fileName, () => {
        reject(err);
      });
    }
  });
}
