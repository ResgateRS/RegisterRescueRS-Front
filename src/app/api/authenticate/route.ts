import { login } from '@/api/login'
import { cookiesNames } from '@/config/storage'
import { loginSchema } from '@/schemas/login-schema'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export type AuthenticateResponseData = {
  token: string
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const parsedData = loginSchema.safeParse(data)
  if (parsedData.success) {
    const body = parsedData.data
    const { data, result } = await login(body)

    if (result !== 1) {
      return new Response(
        JSON.stringify({
          Result: 0,
          Message: 'Usuário e/ou senha inválidos!',
          Data: {},
        }),
      )
    }

    const { token } = data

    const decodedJwt: JwtPayload = jwtDecode(token)
    const expirationTime = decodedJwt.exp
    const oneMonth = 30 * 24 * 60 * 60 * 1000
    const expires = expirationTime
      ? new Date(expirationTime).getTime() * 1000
      : Date.now() + oneMonth

    if (!decodedJwt) {
      return new Response(
        JSON.stringify({
          Result: 0,
          Message: 'O token de sessão é inválido!',
          Data: {},
        }),
      )
    }

    cookies().set(cookiesNames.session, token, {
      expires,
    })

    return new Response(
      JSON.stringify({
        Result: 1,
        Message: '',
        Data: { token },
      }),
    )
  }

  return new Response(
    JSON.stringify({
      Result: 0,
      Message: 'Requisição inválida!',
      Data: {},
    }),
  )
}
