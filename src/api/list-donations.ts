import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListDonationsRequest = {
  cursor?: string | null
  pageSize?: number | null
}

export type ListDonationsResponse = {
  shelterId: string
  shelterName: string
  acceptingDonations: boolean
  address: string
  donationDescription: string
  latitude: number
  longitude: number
}[]

export async function listDonations({
  cursor,
  pageSize,
}: ListDonationsRequest) {
  const response = await api.get<BaseApiResponse<ListDonationsResponse>>(
    '/Shelter/ListDonations',
    {
      headers: {
        'X-Cursor': cursor,
        'X-PageSize': pageSize,
      },
    },
  )

  return formatApiResponse<ListDonationsResponse>(response.data)
}
