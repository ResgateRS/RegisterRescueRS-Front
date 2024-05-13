import { z } from 'zod'

export const registerNeedsSchema = z.object({
  acceptingUnsheltered: z.boolean(),
  acceptingVolunteers: z.boolean(),
  acceptingDoctors: z.boolean(),
  acceptingVeterinary: z.boolean(),
  formLink: z.string().optional(),
  donationsDescription: z.string().optional(),
})

export type RegisterNeedsSchema = z.infer<typeof registerNeedsSchema>
