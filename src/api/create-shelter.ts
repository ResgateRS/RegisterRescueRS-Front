import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { SignupSchema } from '@/schemas/signup-schema'
import { BaseApiResponse } from '@/types/api'

export type CreateShelterRequest = SignupSchema

export async function createShelter({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  rePassword: _,
  ...data
}: CreateShelterRequest) {
  const response = await api.post<BaseApiResponse>('/Shelter', data)

  return formatApiResponse(response.data)
}
