import { z } from 'zod'

export const registerFamilySchema = z.object({
  familyId: z.string().min(1, 'Este campo não pode ser vazio.'),
  houseds: z.array(
    z.object({
      id: z.string().min(1, 'Este campo não pode ser vazio.'),
      name: z.string().min(1, 'Este campo não pode ser vazio.'),
      cellphone: z.string().min(1, 'Este campo não pode ser vazio.'),
      age: z.coerce
        .number()
        .gt(0, 'A idade deve ser maior que 0.')
        .lte(120, 'A idade deve ser menor que 120.'),
      responsable: z.boolean(),
    }),
  ),
})

export type RegisterFamilySchema = z.infer<typeof registerFamilySchema>
