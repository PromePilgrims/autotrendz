import sqlite from 'better-sqlite3-multiple-ciphers'
import { obtemDados } from 'dados'
import fs from 'fs'
import * as cheerio from 'cheerio'

const dbPath = './databases'
const databases = fs.readdirSync(dbPath).filter(file => !file.startsWith('.'))

for(const db of [databases[4]]) {
  const metadata = JSON.parse(fs.readFileSync(`${dbPath}/${db}/metadata.json`, 'utf8'))

  const sqliteDbData = sqlite(`${dbPath}/${db}/m01.db`, { readonly: true })
  sqliteDbData.pragma(`cipher='sqlcipher'`)
  sqliteDbData.pragma(`legacy=3`)
  sqliteDbData.pragma(`key='Mob#_XYa*81-${metadata.codigo_catalogo}'`)

  // https://catexp.com.br/Arquivos?CodEmp=133&CodCli=1&Ver=1

//  {
//   external_code: metadata.codigo_catalogo,
//   product_property: [
//     {
//       columnName: 'CpoAuxProd31',
//       name: 'Descrição'
//     }
//   ],
//   application: [
//     {
//       columnName: 'DescricaoAplicacao',
//       name: 'Veículo'
//     }
//   ]
//  }

  sqliteDbData.close()
}

/**
  { name: 'APLICACAO' },
  { name: 'FABRICANTE' },
  { name: 'FIGURA' },
  { name: 'FIGURA_ITENS' },
  { name: 'GRUPOPRODUTO' },
  { name: 'INFORMATIVO' },
  { name: 'PRODUTO' },
  { name: 'PRODUTO_APLICACAO' },
  { name: 'PRODUTO_OBS' },
  { name: 'REFERENCIACRUZADA' },
  { name: 'SIMILAR' },
  { name: 'SUBGRUPOPRODUTO' },
  { name: 'TABP' },
  { name: 'TABPI' },
  { name: 'TIPOAPLICACAO' },
  { name: 'UMREGISTRO' },
  { name: 'sqlite_stat1' }
 */

// const db = sqlite('./databases/Taranto/m01.db', { readonly: true })

// db.pragma(`cipher='sqlcipher'`)
// db.pragma(`legacy=3`)
// db.pragma(`key='Mob#_XYa*81-161'`)
// //db.pragma(`key='IdF25QRS-Xg^9.À0'`)

//  const json = JSON.parse(fs.readFileSync('./test.json', 'utf-8'))

// IdF25QRS-Xg^9.À0 - m03.db
// Mob#_XYa*81-161 - m01.db
// m02.db = FOTOS

// USAR ISSO PARA OBTER A "DescricaoAplicacao", isso contém o HTML
// para o table de aplicacoes. Percorrer os td e para os vazios, atribuir aplicação sem nome, também atribuir na ordem correta
// que será os campos "DescricaoAplicacao, ComplementoAplicacao, ComplementoAplicacao...".
//obtemDados(json.item)

// console.log(db.prepare(obtemDados(json.item)).all())

//console.log(db.prepare(`SELECT * FROM APLICACAO WHERE CodigoAplicacao = 8370`).all())
//console.log(db.prepare(`SELECT * FROM INFORMATIVO`).all())
// console.log(db.prepare(`SELECT * FROM FABRICANTE WHERE CodigoFabricante = 66`).all())
//console.log(db.prepare(`SELECT * FROM REFERENCIACRUZADA WHERE CodigoProduto = 82`).all())

// console.log({
//   PRODUTO: db.prepare(`SELECT * FROM PRODUTO WHERE CodigoProduto = 82`).all(),
//   PRODUTO_APLICACAO: db.prepare(`SELECT * FROM PRODUTO_APLICACAO WHERE CodigoProduto = 82`).all(),
//   REFERENCIA_CRUZADA: db.prepare(`SELECT * FROM REFERENCIACRUZADA WHERE CodigoProduto = 82`).all(),
//   GRUPOPRODUTO: db.prepare(`SELECT * FROM GRUPOPRODUTO WHERE CodigoGrupoProduto = 66`).all(),
//   PRODUTO_OBS: db.prepare(`SELECT * FROM PRODUTO_OBS WHERE CodigoProduto = 82`).all(),
// })
