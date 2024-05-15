import { z } from 'zod'

export const searchVolunteerSchema = z.object({
  searchTerm: z.string().min(1, 'Este campo não pode ser vazio.'),
})

export type SearchVolunteerSchema = z.infer<typeof searchVolunteerSchema>
