import { z } from 'zod'

export const baseApiResponseSchema = z.object({
  Result: z.literal(0).or(z.literal(1)).or(z.literal(99)),
  Message: z.string(),
  Data: z.unknown().nullable(),
  DebugMessage: z.string().optional(),
})

export type BaseApiResponseSchema = z.infer<typeof baseApiResponseSchema>
