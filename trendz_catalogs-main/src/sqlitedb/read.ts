import sqlite from 'better-sqlite3-multiple-ciphers'
import { env } from 'config'
import fs from 'fs'
import { Metadata } from 'sqlitedb/metadata'

const dbPath = './databases'

export namespace GetDb {
  export type Input =  {
    name: string
  }

  export type Output = {
    metadata: Metadata,
    sqliteDb: sqlite.Database,
    close: () => void
  }
}

const getDb = ({ name }: GetDb.Input): GetDb.Output => {
  const metadata: Metadata = JSON.parse(fs.readFileSync(`${dbPath}/${name}/metadata.json`, 'utf8'))
name
  const sqliteDb = sqlite(`${dbPath}/${name}/m01.db`, { readonly: true })

  sqliteDb.pragma(`cipher='sqlcipher'`)
  sqliteDb.pragma(`legacy=3`)
  sqliteDb.pragma(`key='${env.SQLITE_DB_PASSWORD}-${metadata.codigo_catalogo}'`)

  return {
    metadata,
    sqliteDb: sqliteDb,
    close: () => sqliteDb.close()
  }
}

export { getDb }
