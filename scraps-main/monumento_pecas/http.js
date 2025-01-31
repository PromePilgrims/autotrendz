import axios from 'axios'
import axiosRetry from 'axios-retry'

const http = axios.create({
  timeout: 20000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
})

axiosRetry(http, { retries: 10, shouldResetTimeout: true })

export { http }
