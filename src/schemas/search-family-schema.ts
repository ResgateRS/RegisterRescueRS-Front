import { z } from 'zod'

export const searchScope = ['local', 'global'] as const
export type SearchScope = (typeof searchScope)[number]

export const searchFamilySchema = z.object({
  searchTerm: z.string(),
  scope: z.enum(searchScope),
})

export type SearchFamilySchema = z.infer<typeof searchFamilySchema>
