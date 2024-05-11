import { z } from 'zod'

export const searchFamilySchema = z.object({
  housedSearchTerm: z.string().min(1, 'Este campo não pode ser vazio.'),
  scope: z.enum(['this', 'all']),
})

export type SearchFamilySchema = z.infer<typeof searchFamilySchema>
