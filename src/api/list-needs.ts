import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListNeedsRequest = {
  authToken?: string | null
}

export type ListNeedsResponse = {
  acceptingVolunteers: boolean
  acceptingDoctors: boolean
  acceptingVeterinarians: boolean
  acceptingDonations: boolean
  avaliable: boolean
  donationDescription: string
  volunteersSubscriptionLink: string
}

export async function listNeeds({ authToken }: ListNeedsRequest) {
  const response = await api.get<BaseApiResponse<ListNeedsResponse>>(
    '/Shelter/Needs',
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  )

  return formatApiResponse<ListNeedsResponse>(response.data)
}
