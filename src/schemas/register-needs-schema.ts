import { z } from 'zod'

export const registerNeedsSchema = z.object({
  shelterId: z.string().min(1, 'Este campo não pode ser vazio.'),
  acceptingUnsheltered: z.boolean(),
  acceptingVolunteers: z.boolean(),
  acceptingDoctors: z.boolean(),
  acceptingVeterinary: z.boolean(),
  acceptingDonations: z.boolean(),
  formLink: z.string().url('Insira um link válido.').or(z.literal('')),
  donationsDescription: z
    .string()
    .max(350, 'Você só pode escrever até 350 caracteres neste campo.')
    .or(z.literal('')),
})

export type RegisterNeedsSchema = z.infer<typeof registerNeedsSchema>
