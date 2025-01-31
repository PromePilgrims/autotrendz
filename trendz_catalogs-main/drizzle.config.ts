import { env } from './src/config/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema',
  dbCredentials: {
    url: env.DB_CONNECTION_STRING,
  }
})
