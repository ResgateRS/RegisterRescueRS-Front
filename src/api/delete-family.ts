import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type DeleteFamilyRequest = {
  familyId: string
  authToken?: string | null
}

export async function deleteFamily({
  familyId,
  authToken,
}: DeleteFamilyRequest) {
  const response = await api.delete<BaseApiResponse>('/Family', {
    params: {
      familyId,
    },
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  return formatApiResponse(response.data)
}
