import { env } from '@/env'
import { baseApiResponseSchema } from '@/schemas/base-api-response.schema'

export type IsValidSessionRequest = {
  token: string
}

export async function isValidSession({ token }: IsValidSessionRequest) {
  const body = { token }
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/Login/Validate`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  const responseJson = await response.json()

  const parsedResponse = baseApiResponseSchema.safeParse(responseJson)

  return parsedResponse.success && parsedResponse.data.Result === 1
}
