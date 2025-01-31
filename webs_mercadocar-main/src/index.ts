import { streamSitemap } from './stream-sitemap'
import { JSDOM } from 'jsdom';
import axios from 'axios';
import { filter, mergeMap, of } from 'rxjs';
import { columns } from './xlsx';
import { appendAsync, createWriteStream, dirAsync, existsAsync, readAsync, writeAsync } from 'fs-jetpack';
import { sendToDiscord } from './discord';
import XLSXWriteStream from '@atomictech/xlsx-write-stream'

async function run() {
  const args = process.argv;
  const url = args.pop()!;
  const path = './tmp/json2'
  const excelPath = './tmp/csv'
  await dirAsync('./tmp')
  await dirAsync(path)
  await dirAsync(excelPath, { empty: true })

  await processUrl(path, excelPath, url)
  await sendToDiscord(`${excelPath}/output.xlsx`, [
    `📊 **Relatório de produtos**`,
    `-------------------------------------------------------`,
    `📅 **Data:** ${new Date().toLocaleDateString('pt-BR')}`,
    `🕒 **Hora:** ${new Date().toLocaleTimeString('pt-BR')}`,
    `🔗 **URL:** ${url}`,
  ].join('\n'))
}

async function processUrl(path: string, excelPath: string, url: string) {
  await new Promise<void>(async (resolve) => {
    const stream = streamSitemap(url)
    // const stream = of(
    //   'https://www.mercadocar.com.br/coxim-do-escapamento-dianteiro-hyundai-hr-borflex-5406', 
    //   'https://www.mercadocar.com.br/suporte-central-do-escapamento-metalsystem-05893'
    // )
    const errorPath = path + '/errors.txt'
    const xlsxPath = excelPath + '/output.xlsx'

    const xlsxWriter = new XLSXWriteStream({
      header: true,
      columns,
    });
    const writerStream = createWriteStream(xlsxPath);
    xlsxWriter.pipe(writerStream);

    if (!await existsAsync(errorPath)) {
      await writeAsync(errorPath, '')
    }

    const errorsUrls = (await readAsync(errorPath, 'utf8'))!.split('\n').filter((v) => !!v)

    stream.pipe(
      filter((pageUrl) => !errorsUrls.includes(pageUrl)),
      mergeMap((pageUrl) => fetchPage(pageUrl), 50),
      mergeMap(async (res) => {
        const { product, url } = res;
        if(!product) {
          return res;
        }

        const row = {
          'Nome': product.name,
          'Preço': product.price,
          'Disponibilidade': product.availability,
          'Fabricante': product.manufacturer.name,
          'Código do Fabricante': product.manufacturer.code,
          'Descrição': product.description?.join(', '),
          'Imagens': product.images.join(','),
          'Url': url,
          'Breadcrumb': product.breadcrumbs.map((breadcrumb) => {
            return `${breadcrumb.name} (${breadcrumb.url})`
          }).slice(1, -1).join(', '),
        }

        const xlsxRow = Object.values(row)
        await new Promise<void>((resolve) => {
          xlsxWriter.write(xlsxRow, () => {
            console.log(`📝 URL: ${url}, { ${res.time}ms }`);
            resolve()
          })
        })

        return res;
      })
    ).subscribe({
      next: async (data) => {
        if (!!data.product) {
          // console.log(`${data.exists ? '⚡' : '🔥'} URL: ${data?.url}, { ${data.time}ms }`);
        } else {
          console.log(`❌ URL: ${data?.url}, { ${data.time}ms }`);
          await appendAsync(errorPath, data?.url + '\n')
        }
      },
      error: (error) => {
        console.error(`Error: `, error.message);
        resolve();
      },
      complete: async () => {
        await xlsxWriter.end();
        console.log('✔ Processamento do sitemap concluído.');
        resolve();
      },
    });
  })
}

async function fetchPage(pageUrl: string) {
  const start = Date.now()
  try {
    const response = await axios.get<Buffer>(pageUrl, {
      responseType: 'arraybuffer'
    });
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const getText = (selector: string) => document.querySelector(selector)?.textContent?.trim()

    const name = getText('.product-essential .overview .product-name h1')
    const price = getText('.product-essential .overview .prices .product-price span')
    const description = getText('.productTabs #quickTab-description')?.split('\n')
    const images = Array.from(
      document.querySelectorAll('.gallery img')
    ).map((img) => img.getAttribute('src'))
    const breadcrumbs = Array.from(
      document.querySelectorAll('.breadcrumb ul li')
    ).map((el) => {
      const link = el.querySelector('a')
      return {
        name: link?.textContent?.trim(),
        url: link?.getAttribute('href')
      }
    }).filter((v) => !!v.name && !!v.url)
    const manufacturer = getText('.overview .manufacturers .value')
    const availability = getText('.overview .availability .value')
    const manufacturerCode = getText('.overview .additional-details .manufacturer-part-number .value')

    if (!name) {
      throw new Error('Esta página não pertence a um produto.')
    }

    const product = {
      name,
      price,
      description,
      images,
      breadcrumbs,
      availability,
      manufacturer: {
        name: manufacturer,
        code: manufacturerCode
      }
    }

    const end = Date.now()

    return {
      url: pageUrl,
      product,
      exists: false,
      time: end - start,
    };
  } catch (error: any) {
    const end = Date.now()

    return {
      url: pageUrl,
      time: end - start,
    };
  }
}

run()