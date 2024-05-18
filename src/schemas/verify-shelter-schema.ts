import { z } from 'zod'

export const verifyShelterSchema = z.object({
  shelterId: z.string().min(1, 'Este campo não pode ser vazio.'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})

export type VerifyShelterSchema = z.infer<typeof verifyShelterSchema>
