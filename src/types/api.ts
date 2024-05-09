export type BaseApiResponse<T = unknown> = {
  Result: number
  Message: string
  Data: T
}

export type FormattedBaseApiResponse<T = unknown> = {
  result: number
  message: string
  data: T
}
