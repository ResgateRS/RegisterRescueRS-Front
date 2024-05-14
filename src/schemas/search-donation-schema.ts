import { z } from 'zod'

export const searchDonationSchema = z.object({
  searchTerm: z.string().min(1, 'Este campo não pode ser vazio.'),
})

export type SearchDonationSchema = z.infer<typeof searchDonationSchema>
