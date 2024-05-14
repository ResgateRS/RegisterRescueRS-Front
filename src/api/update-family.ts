import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { RegisterFamilySchema } from '@/schemas/register-family-schema'
import { BaseApiResponse } from '@/types/api'

export type UpdateFamilyRequest = {
  authToken?: string | null
} & RegisterFamilySchema

export async function updateFamily({
  authToken,
  ...data
}: UpdateFamilyRequest) {
  const response = await api.post<BaseApiResponse>('/Family', data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  return formatApiResponse(response.data)
}
