import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { LoginSchema } from '@/schemas/login-schema'
import { BaseApiResponse } from '@/types/api'

export type LoginResponse = {
  token: string
}

export async function login({ login, password }: LoginSchema) {
  const body = { login, password }
  const response = await api.post<BaseApiResponse<LoginResponse>>(
    '/Login',
    body,
  )

  return formatApiResponse<LoginResponse>(response.data)
}
