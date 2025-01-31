import axios from 'axios'
import axiosRetry from 'axios-retry'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const http = axios.create({
  baseURL: 'https://18.229.10.78',
  timeout: 10000,
  rejectUnauthorized: false,
})

axiosRetry(http, { retries: 10 })

export { http }
