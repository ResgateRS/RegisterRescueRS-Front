import { env } from '@/env'
import { formatApiResponse } from '@/functions/format-api-response'
import { LoginSchema } from '@/schemas/login-schema'
import { BaseApiResponse } from '@/types/api'
import axios from 'axios'

export type AuthenticateResponse = {
  token: string
}

export async function authenticate({ login, password }: LoginSchema) {
  const body = { login, password }
  const response = await axios.post<BaseApiResponse<AuthenticateResponse>>(
    `${env.NEXT_PUBLIC_NEXT_API_URL}/api/authenticate`,
    body,
  )

  return formatApiResponse<AuthenticateResponse>(response.data)
}
