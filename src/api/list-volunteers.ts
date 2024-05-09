import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListVolunteersRequest = {
  authToken: string
  cursor?: string | null
  pageSize?: number | null
  latitude?: number
  longitude?: number
}

export type ListVolunteersResponse = {
  shelterId: string
  acceptingVolunteers: boolean
  acceptingDoctors: boolean
  acceptingVeterinarians: boolean
  acceptingDonations: boolean
  avaliable: boolean
  address: string
  volunteersSubscriptionLink: string
  latitude: number
  longitude: number
  shelterName: string
}[]

export async function listVolunteers({
  authToken,
  cursor,
  pageSize,
  latitude,
  longitude,
}: ListVolunteersRequest) {
  const response = await api.get<BaseApiResponse<ListVolunteersResponse>>(
    '/Shelter/ListVolunteers',
    {
      params: {
        latitude,
        longitude,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-Cursor': cursor,
        'X-PageSize': pageSize,
      },
    },
  )

  return formatApiResponse<ListVolunteersResponse>(response.data)
}
