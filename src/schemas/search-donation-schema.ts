import { z } from 'zod'

export const searchDonationSchema = z.object({
  searchTerm: z.string(),
})

export type SearchDonationSchema = z.infer<typeof searchDonationSchema>
