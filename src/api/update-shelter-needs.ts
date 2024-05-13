import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { RegisterNeedsSchema } from '@/schemas/register-needs-schema'
import { BaseApiResponse } from '@/types/api'

export type UpdateShelterNeedsRequest = {
  authToken?: string | null
} & RegisterNeedsSchema

export async function updateShelterNeeds({
  authToken,
  ...data
}: UpdateShelterNeedsRequest) {
  const response = await api.post<BaseApiResponse>('/Shelter/Needs', data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  return formatApiResponse(response.data)
}
