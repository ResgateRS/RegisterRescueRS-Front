import { z } from 'zod'

export const jwtUserDataSchema = z
  .object({
    ShelterId: z.string(),
    ShelterName: z.string(),
    Adm: z.boolean(),
  })
  .transform((schema) => ({
    shelterId: schema.ShelterId,
    shelterName: schema.ShelterName,
    adm: schema.ShelterName,
  }))

export type JwtUserDataSchema = z.infer<typeof jwtUserDataSchema>
