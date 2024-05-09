import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListDonationsRequest = {
  authToken: string
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
  authToken,
  cursor,
  pageSize,
}: ListDonationsRequest) {
  const response = await api.get<BaseApiResponse<ListDonationsResponse>>(
    '/Shelter/ListDonations',
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'X-Cursor': cursor,
        'X-PageSize': pageSize,
      },
    },
  )

  return formatApiResponse<ListDonationsResponse>(response.data)
}
