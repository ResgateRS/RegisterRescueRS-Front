export type BaseApiResponse<T = unknown> = {
  Result: number
  Message: string
  Data: T
  DebugMessage: string
}

export type FormattedBaseApiResponse<T = unknown> = {
  result: number
  message: string
  data: T
  debugMessage: string
}
