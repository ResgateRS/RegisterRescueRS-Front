import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListUnverifiedSheltersRequest = {
  authToken?: string | null
}

export type ListUnverifiedSheltersResponse = {
  shelterId: string
  shelterName: string
  address: string
  shelterCellphone: string
}[]

export async function listUnverifiedShelters({
  authToken,
}: ListUnverifiedSheltersRequest) {
  const response = await api.get<
    BaseApiResponse<ListUnverifiedSheltersResponse>
  >('/Shelter/Unverifieds', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  return formatApiResponse<ListUnverifiedSheltersResponse>(response.data)
}
