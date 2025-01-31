import dotenv from 'dotenv'
dotenv.config()
import http from './http.js'
import mysql from './mysql.js'

const pool = mysql.newPool()

http.get('/', (_, res) => {
  res.json({ status: 'OK' })
})

http.post('/query', async (req, res) => {
  const { sql, statements } = req.body

  try {
    const results = await mysql.run(pool, sql, statements)
    res.json({ data: results, error: null })
  } catch (err) {
    console.log(err)
    res.status(404).json({ data: null, error: err.message })
  }
})

http.listen(process.env.PORT, () => {
  console.log(`OdontoTrendz Data proxy running on port ${process.env.PORT}`)
})

process.on('SIGINT', () => {
  mysql.close(pool)
  process.exit()
})
