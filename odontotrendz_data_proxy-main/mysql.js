import mysql from 'mysql2/promise'

const newPool = () => {
  const {
    DB_HOST: host,
    DB_PORT: port,
    DB_USER: user,
    DB_PASS: password
  } = process.env

  return mysql.createPool({
    host,
    port: parseInt(port),
    user,
    password,
    connectionLimit: 10,
    idleTimeout: 300000,
    maxIdleTime: 300000
  })
}

const run = async (pool, sql, statements) => {
  try {
    const connection = await pool.getConnection()
    const [rows] = await connection.query(sql, statements)
    connection.release()
    return rows
  } catch (error) {
    throw error
  }
}

const close = (pool) => {
  pool.end()
}

export default { newPool, run, close }
