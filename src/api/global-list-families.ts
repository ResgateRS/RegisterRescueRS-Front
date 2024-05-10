import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type GlobalListFamiliesRequest = {
  cursor?: string | null
  pageSize?: number | null
  searchItem?: string | null
}

export type ListFamiliesResponse = {
  familyId: string
  totalPeopleNumber: number
  responsable: string
  cellphone: string
  latitude: number
  longitude: number
  updatedAt: Date
}[]

export async function globalListFamilies({
  cursor,
  pageSize,
  searchItem,
}: GlobalListFamiliesRequest) {
  const response = await api.get<BaseApiResponse<ListFamiliesResponse>>(
    '/Family/List',
    {
      params: {
        searchItem,
      },
      headers: {
        'X-Cursor': cursor,
        'X-PageSize': pageSize,
      },
    },
  )

  return formatApiResponse<ListFamiliesResponse>(response.data)
}
