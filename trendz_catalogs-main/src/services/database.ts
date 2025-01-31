import sqlite from 'better-sqlite3-multiple-ciphers'

const db = sqlite('./databases/tecfill/m01.db', {})

db.pragma(`cipher='sqlcipher'`)
db.pragma(`legacy=3`)
db.pragma(`key='Mob#_XYa*81-133'`)

const data = db.prepare('').all()
console.log(data)

