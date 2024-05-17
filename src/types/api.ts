export type BaseApiResponse<T = unknown> = {
  Result: 0 | 1 | 98 | 99
  Message: string
  Data: T
  DebugMessage?: string
}

export type FormattedBaseApiResponse<T = unknown> = {
  result: 0 | 1 | 98 | 99
  message: string
  data: T
  debugMessage?: string
}

export type JwtPayload = {
  userData: string
  nbf: number
  exp: number
  iat: number
}
