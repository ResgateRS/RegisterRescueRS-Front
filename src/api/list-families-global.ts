import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListFamiliesGlobalRequest = {
  cursor?: string | null
  pageSize?: number | null
  searchTerm?: string | null
  authToken?: string | null
}

export type ListFamiliesGlobalResponse = {
  familyId: string
  totalPeopleNumber: number
  responsable: string
  cellphone: string
  latitude: number
  longitude: number
  updatedAt: string
}[]

export async function listFamiliesGlobal({
  cursor,
  pageSize,
  authToken,
}: ListFamiliesGlobalRequest) {
  const response = await api.get<BaseApiResponse<ListFamiliesGlobalResponse>>(
    '/Family/GlobalList',
    {
      params: {
        searchTerm: 'j',
      },
      headers: {
        'X-Cursor': cursor,
        'X-PageSize': pageSize,
        Authorization: authToken,
      },
    },
  )

  return formatApiResponse<ListFamiliesGlobalResponse>(response.data)
}
