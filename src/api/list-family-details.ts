import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListFamilyDetailsRequest = {
  familyId: string
  authToken?: string | null
}

export type ListFamilyDetailsResponse = {
  familyId: string
  shelterId: string
  responsable: string
  latitude: number
  longitude: number
  registeredAt: string
  updatedAt: string
  houseds: {
    id: string
    name: string
    age: number
    responsable: boolean
    cellphone?: string
  }[]
}

export async function listFamilyDetails({
  familyId,
  authToken,
}: ListFamilyDetailsRequest) {
  const response = await api.get<BaseApiResponse<ListFamilyDetailsResponse>>(
    '/Family/Details',
    {
      params: {
        familyId,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  )

  return formatApiResponse<ListFamilyDetailsResponse>(response.data)
}
