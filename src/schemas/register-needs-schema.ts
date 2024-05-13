import { z } from 'zod'

export const registerNeedsSchema = z.object({
  shelterId: z.string().min(1, 'Este campo não pode ser vazio.'),
  acceptingUnsheltered: z.boolean(),
  acceptingVolunteers: z.boolean(),
  acceptingDoctors: z.boolean(),
  acceptingVeterinary: z.boolean(),
  acceptingDonations: z.boolean(),
  formLink: z.string().optional(),
  donationsDescription: z.string().optional(),
})

export type RegisterNeedsSchema = z.infer<typeof registerNeedsSchema>
