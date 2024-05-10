import { z } from 'zod'

export const baseApiResponseSchema = z.object({
  Result: z.number(),
  Message: z.string(),
  Data: z.unknown().nullable(),
  DebugMessage: z.string().optional(),
})

export type BaseApiResponseSchema = z.infer<typeof baseApiResponseSchema>
