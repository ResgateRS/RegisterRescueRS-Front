import axios from 'axios'
import Cookies from 'js-cookie'

import { cookiesNames } from '@/config/storage'
import { env } from '@/env'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use((request) => {
  const headers = request.headers ?? {}

  const token = Cookies.get(cookiesNames.session)

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  request.headers = headers
  return request
})
