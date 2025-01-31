import axios from 'axios'
import axiosRetry from 'axios-retry'

const http = axios.create({
  timeout: 20000,
})

axiosRetry(http, { retries: 10 })

export { http }
