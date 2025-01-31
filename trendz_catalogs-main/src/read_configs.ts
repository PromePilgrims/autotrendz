import sqlite from 'better-sqlite3-multiple-ciphers'

const dbPath = './databases'

const sqliteDbData = sqlite(`${dbPath}/Tecfil/m03.db`, { readonly: true })
sqliteDbData.pragma(`cipher='sqlcipher'`)
sqliteDbData.pragma(`legacy=3`)
sqliteDbData.pragma(`key='IdF25QRS-Xg^9.À0'`)

console.log(sqliteDbData.prepare('SELECT * FROM CONFIG').all())

sqliteDbData.close()
