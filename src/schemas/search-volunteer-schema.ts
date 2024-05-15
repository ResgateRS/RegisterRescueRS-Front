import { z } from 'zod'

export const searchVolunteerSchema = z.object({
  searchTerm: z.string(),
})

export type SearchVolunteerSchema = z.infer<typeof searchVolunteerSchema>
