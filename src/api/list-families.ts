import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListFamiliesRequest = {
  cursor?: string | null
  pageSize?: number | null
  searchTerm?: string | null
  authToken?: string | null
  global?: boolean
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
  authToken,
  searchTerm,
  global,
}: ListFamiliesRequest) {
  const response = await api.get<BaseApiResponse<ListFamiliesResponse>>(
    '/Family/List',
    {
      params: {
        global,
        searchTerm,
      },
      headers: {
        'X-Cursor': cursor,
        'X-PageSize': pageSize,
        Authorization: `Bearer ${authToken}`,
      },
    },
  )

  return formatApiResponse<ListFamiliesResponse>(response.data)
}
