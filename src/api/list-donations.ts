import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListDonationsRequest = {
  cursor?: string | null
  pageSize?: number | null
  latitude?: number
  longitude?: number
  searchTerm?: string | null
}

export type ListDonationsResponse = {
  shelterId: string
  acceptingDonations: boolean
  shelterName: string
  address: string
  latitude: number
  longitude: number
  updatedAt: string
  donationDescription?: string
}[]

export async function listDonations({
  cursor,
  pageSize,
  latitude,
  longitude,
  searchTerm,
}: ListDonationsRequest) {
  const response = await api.get<BaseApiResponse<ListDonationsResponse>>(
    '/Shelter/ListDonations',
    {
      params: {
        latitude,
        longitude,
        searchTerm,
      },
      headers: {
        'X-Cursor': cursor,
        'X-PageSize': pageSize,
      },
    },
  )

  return formatApiResponse<ListDonationsResponse>(response.data)
}
