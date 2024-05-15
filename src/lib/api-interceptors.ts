import { cookiesNames } from '@/config/storage'
import { cookies } from 'next/headers'
import { api } from './axios'

api.interceptors.request.use(async (request) => {
  const headers = request.headers ?? {}
  if (typeof window === 'undefined') {
    const token = cookies().get(cookiesNames.session)?.value

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  request.headers = headers
  return request
})
