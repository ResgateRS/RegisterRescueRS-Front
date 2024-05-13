import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type AddShelterNeedsRequest = {
  shelterId?: string
  acceptingVolunteers: boolean
  acceptingDoctors: boolean
  acceptingVeterinarians: boolean
  acceptingDonations: boolean
  donationDescription?: string
  volunteersSubscriptionLink?: string
  authToken?: string | null
}

export async function addShelterNeeds({
  authToken,
  ...data
}: AddShelterNeedsRequest) {
  const response = await api.post<BaseApiResponse>('/Shelter/Needs', data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  return formatApiResponse(response.data)
}
