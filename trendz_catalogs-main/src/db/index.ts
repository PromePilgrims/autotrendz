import { env } from 'config/env'
import { drizzle } from 'drizzle-orm/node-postgres'

const db = drizzle(env.DB_CONNECTION_STRING, { logger: false, casing: 'snake_case' })

export { db }
