import { login } from '@/api/login'
import { loginSchema } from '@/schemas/login-schema'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export type AuthenticateResponseData = {
  token: string
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const result = loginSchema.safeParse(data)
  if (result.success) {
    const body = result.data

    const {
      data: { token },
    } = await login(body)

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
        {
          status: 401,
        },
      )
    }

    cookies().set('rescuers-token', token, {
      expires,
    })

    return new Response(
      JSON.stringify({
        Result: 1,
        Message: '',
        Data: { token },
      }),
      {
        status: 200,
      },
    )
  }

  return new Response(
    JSON.stringify({
      Result: 0,
      Message: 'Requisição inválida!',
      Data: {},
    }),
    {
      status: 400,
    },
  )
}
