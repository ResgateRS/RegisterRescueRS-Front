import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { jwtDecode, JwtPayload } from 'jwt-decode'

type ResponseData = {
  status: boolean
  code?: number
  message?: string
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  console.log('FUNCIONOU', JSON.parse(req.body))

  const apiAddress = process.env.NEXT_PUBLIC_API_URL || ''
  const username = req.body.username || ''
  const password = req.body.password || ''
  const body = { login: username, password }

  try {
    const payload = await axios.post(`${apiAddress}/Login`, body, {
      headers: { 'Content-Type': 'application/json' },
    })
    const jwt = payload.Data.token
    const decodedjwt: JwtPayload = jwtDecode(jwt)
    const decodedexp = decodedjwt.exp ? decodedjwt.exp : 0

    // const now = new Date()
    // const decodedexp = now.setDate(now.getDate() + 30)
    // const exp = new Date(decodedexp * 1000).toUTCString()

    if (!jwt) {
      res
        .status(500)
        .send({ status: false, code: 500, message: 'Token problem' })
    }

    res.setHeader(
      'Set-Cookie',
      `sid=${jwt}; Expires=${decodedexp}; SameSite=Strict; Path=/;`,
    )
    res.status(200).json({ status: true })
  } catch (e: any) {
    const apiErrorMessage = e?.response?.data?.error || ''
    const requestErrorCode = e?.response?.status || ''
    console.log('[Fetch Error]', e)
    res
      .status(500)
      .send({ status: false, code: requestErrorCode, message: apiErrorMessage })
  }
  // return NextResponse.json({ status: 'OK' })
  // res.status(200).json({ message: 'Hello from Next.js!' })
}
