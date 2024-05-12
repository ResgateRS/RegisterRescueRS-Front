import { login } from '@/api/login'
import { cookiesNames } from '@/config/storage'
import { loginSchema } from '@/schemas/login-schema'
import { JwtPayload } from '@/types/api'
import { jwtDecode } from 'jwt-decode'
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

    if (result === 0) {
      return new Response(
        JSON.stringify({
          Result: 0,
          Message: 'Usuário e/ou senha inválidos!',
          Data: {},
        }),
      )
    }

    if (result === 99) {
      return new Response(
        JSON.stringify({
          Result: 99,
          Message: 'O token de autenticação não foi enviado!',
          Data: {},
        }),
      )
    }

    const { token } = data

    const decodedJwt = jwtDecode<JwtPayload>(token)
    const expirationTime = decodedJwt.exp
    const expires = new Date(expirationTime).getTime() * 1000

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
