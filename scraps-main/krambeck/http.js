import axios from 'axios'
import axiosRetry from 'axios-retry'

const http = axios.create({
  responseEncoding: 'binary',
  timeout: 5000
})

axiosRetry(http, { retries: 10, shouldResetTimeout: true })

export { http }
