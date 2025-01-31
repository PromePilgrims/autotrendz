import 'dotenv/config'

const env = {
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  DB_USER: process.env.DB_USER ?? '',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
  DB_NAME: process.env.DB_NAME ?? '',
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING ?? '',
  SQLITE_DB_PASSWORD: process.env.SQLITE_DB_PASSWORD ?? '',
}

export { env }
