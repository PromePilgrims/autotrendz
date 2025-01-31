// 26054159@26054159
// Audatex1
// https://login.audatex.com.br/Account/OficinasFirstAccess?userName=26054159@26054159&_=1709389159742

import xlsx from 'xlsx'
import fs from 'fs'
import { DateTime } from 'luxon'

const token = fs.readFileSync('./token.txt', 'utf-8')

async function getPrice(pn, codigo_montadora) {
  const request = await fetch(`https://audatexweb.audatex.com.br/ConsultaPecas/Api/Servicos/VeiculosPecasManual?codigoPeca=${pn}&codigoMontadora=${codigo_montadora}`, {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + token,
    },
  })

  const data = await request.json()

  return data
}

async function getPriceByPN(montadoras, pn, montadora_name) {
  if (montadora_name) {
    const montadora = montadoras.find(m => m.nome == montadora_name)
    if (!montadora) return null

    const price = await getPrice(pn, montadora.codigo)
    if (!price) return null

    return {
      montadora: montadora.nome,
      descricao: price.PecaDescricao,
      preco: price.PecaPrecoConc,
    }
  }

  for (let montadora of montadoras) {
    const price = await getPrice(pn, montadora.codigo)

    if (price) {
      return {
        montadora: montadora.nome,
        descricao: price.PecaDescricao,
        preco: price.PecaPrecoConc,
      }
    }
  }

  return null
}

async function getMontadoras() {
  const request = await fetch(
    'https://audatexweb.audatex.com.br/ConsultaPecas/Api/Servicos/MontadorasVeiculos',
    {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: 'Bearer ' + token,
      },
    }
  )

  const data = await request.json()

  return data.map((data) => ({ codigo: data.codMont, nome: data.Montadora }))
}

function formatMarca(marca) {
  const de_para = {
    Volkswagen: 'VW',
    Jeep: 'Fiat',
  }

  if (de_para[marca]) {
    marca = de_para[marca]
  }

  return marca.toUpperCase().trim()
}

async function main() {
  const workbook = xlsx.readFile('./Preços Novembro.xlsx')
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
  const items_size = data.length

  const montadoras = await getMontadoras()

  const newDatas = []
  for (const item of data) {
    const data = await getPriceByPN(montadoras, item['PN'], formatMarca(item[' Marca ']))

    newDatas.push({
      Marca: item[' Marca '],
      'PN': item['PN'],
      'Descricao Audatex': data?.descricao,
      'Preço': data?.preco,
    })

    process.stdout.write(`Progress: ${newDatas.length}/${items_size} \r`)
  }

  const dateNow = new Date()
  const date = DateTime.fromJSDate(dateNow).toFormat('dd-MM-yyyy')

  const newWorkbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(newWorkbook, xlsx.utils.json_to_sheet(newDatas), 'Preços')
  xlsx.writeFile(newWorkbook, `Preços Audatex Novembro - ${date}.xlsx`)
}

main()
