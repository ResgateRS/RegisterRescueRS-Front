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
}
export async function addShelterNeeds(form: AddShelterNeedsRequest) {
  const response = await api.post<BaseApiResponse>('/Shelter/Needs', form)

  return formatApiResponse(response.data)
}
