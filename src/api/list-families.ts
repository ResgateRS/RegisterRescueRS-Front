import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'
import { ListFamiliesResponse } from './global-list-families'

export type ListFamiliesRequest = {
  cursor?: string | null
  pageSize?: number | null
}

export async function listFamilies({ cursor, pageSize }: ListFamiliesRequest) {
  const response = await api.get<BaseApiResponse<ListFamiliesResponse>>(
    '/Family/List',
    {
      headers: {
        'X-Cursor': cursor,
        'X-PageSize': pageSize,
      },
    },
  )

  return formatApiResponse<ListFamiliesResponse>(response.data)
}
