import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type ListNeedsRequest = {
  authToken?: string | null
}

export type ListNeedsResponse = {
  acceptingVolunteers: boolean
  acceptingDoctors: boolean
  acceptingVeterinary: boolean
  acceptingDonations: boolean
  acceptingUnsheltered: boolean
  donationsDescription?: string
  formLink?: string
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
