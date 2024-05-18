import { formatApiResponse } from '@/functions/format-api-response'
import { api } from '@/lib/axios'
import { BaseApiResponse } from '@/types/api'

export type VerifyShelterRequest = {
  shelterId: string
  latitude: number
  longitude: number
  authToken?: string | null
}

export type VerifyShelterResponse = {
  token: string
}

export async function verifyShelter({
  authToken,
  ...data
}: VerifyShelterRequest) {
  const response = await api.post<BaseApiResponse<VerifyShelterResponse>>(
    '/Shelter/Verify',
    data,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  )

  return formatApiResponse<VerifyShelterResponse>(response.data)
}
