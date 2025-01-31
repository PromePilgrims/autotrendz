import express from 'express'
import helmet from 'helmet'
import validateApiKey from './validate-api-key.js'
import validateQuery from './validate-query.js'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(validateApiKey())
app.use(validateQuery())

export default app
