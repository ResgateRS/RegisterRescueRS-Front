import axios from 'axios'

import { env } from '@/env'
import { cookies } from 'next/headers'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (request) => {
  const headers = request.headers ?? {}
  if (typeof window === 'undefined') {
    const token = cookies().get('rescuers-session')?.value

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  request.headers = headers
  return request
})
