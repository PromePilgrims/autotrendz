import XLSX, { write } from 'xlsx'
import { createWriteStream, dirAsync, existsAsync, inspectTreeAsync, readAsync } from 'fs-jetpack'
import { Observable, concatMap, delay, mergeMap } from 'rxjs';
import { JSONFile } from './types';

const separator = '\t'

async function appendCsv(output: string, item: string[]) {
  let workbook;
  let worksheet;

  // Verifica se o arquivo já existe
  if (await existsAsync(output)) {
    // Lê o arquivo XLSX existente
    workbook = XLSX.readFile(output);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    // Cria um novo workbook e uma nova worksheet
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  }

  // Converte a worksheet para um array de arrays (matriz)
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Adiciona a nova linha
  data.push(item);

  // Converte de volta a matriz para worksheet
  worksheet = XLSX.utils.aoa_to_sheet(data as any);
  workbook.Sheets[workbook.SheetNames[0]] = worksheet;

  // Salva o arquivo XLSX
  XLSX.writeFile(workbook, output);
}

export const columns = [
  'Nome',
  'Preço',
  'Disponibilidade',
  'Fabricante',
  'Código do Fabricante',
  'Descrição',
  'Imagens',
  'Url',
  'Breadcrumb',
]

export async function parseToExcel(path: string, output: string) {
  const tree = await inspectTreeAsync(path);
  await dirAsync(path)

  if(!tree) {
    console.log('Nenhum arquivo encontrado.')
    return
  }
  const { children: files } = tree;
  appendCsv(output, columns)

  // console.log(`Encontrados ${files.length} arquivos.`)

  await new Promise<void>((resolve) => {
    new Observable<string>((subscriber) => {
      files.forEach((file) => {
        subscriber.next(file.name)
      })
  
      subscriber.complete()
    }).pipe(
      delay(100),
      mergeMap(async (file) => {
        try{
          const { product, url }: JSONFile = await readAsync(`${path}/${file}`, 'json')
          return {
            'Nome': product.name,
            'Preço': product.price,
            'Disponibilidade': product.availability,
            'Fabricante': product.manufacturer.name,
            'Código do Fabricante': product.manufacturer.code,
            'Descrição': product.description.join(', '),
            'Imagens': product.images.join(','),
            'Url': url,
            'Breadcrumb': product.breadcrumbs.map((breadcrumb) => {
              return `${breadcrumb.name} (${breadcrumb.url})`
            }).slice(1, -1).join(', '),
          }
        }catch(e) {
          return null
        }
      }, 5),
      concatMap(async (data) => {
        if(data) {
          appendCsv(output, Object.values(data))
        }
  
        return data;
      })
    ).subscribe({
      next: async (data) => {
        // if(data) {
        //   appendCsv(output, Object.values(data))
        // }
      },
      error: (error) => {
        console.error('Error: ', error.message)
        resolve()
      },
      complete: async () => {
        console.log(`✔ - Novo arquivo gerado: ${output}`)
        resolve()
  
        // writeAsync(`./tmp/output.json`, JSON.stringify(result, null, 2), { atomic: true })
  
        // XLSX.writeFileAsync(workbook, `./tmp/xlsx/${Date.now()}-output.xlsx`, {});
      }
    })
  })
}