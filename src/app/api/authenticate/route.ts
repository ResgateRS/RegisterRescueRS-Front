import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse, NextRequest } from 'next/server'

type ResponseData = {
  message: string
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  console.log('FUNCIONOU', JSON.parse(req.body))
  return NextResponse.json({ status: 'OK' })
  // res.status(200).json({ message: 'Hello from Next.js!' })
}
