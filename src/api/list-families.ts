import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListFamiliesRequest = {
  cursor?: string | null
  pageSize?: number | null
  searchTerm?: string | null
  authToken?: string | null
}

export type ListFamiliesResponse = {
  familyId: string
  totalPeopleNumber: number
  responsable: string
  cellphone: string
  latitude: number
  longitude: number
  updatedAt: string
}[]

export async function listFamilies({
  cursor,
  pageSize,
  searchTerm,
  authToken,
}: ListFamiliesRequest) {
  const response = await api.get<BaseApiResponse<ListFamiliesResponse>>(
    '/Family/List',
    {
      params: {
        searchTerm,
      },
      headers: {
        'X-Cursor': cursor,
        'X-PageSize': pageSize,
        Authorization: authToken,
      },
    },
  )

  return formatApiResponse<ListFamiliesResponse>(response.data)
}
