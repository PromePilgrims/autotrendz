import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/web',
  headers: {
    'x-auth-token': process.env.NEXT_PUBLIC_API_TOKEN
  }
})
