import { z } from 'zod'

export const registerFamilySchema = z
  .object({
    familyId: z.string().optional(),
    houseds: z.array(
      z.object({
        id: z.string().min(1, 'Este campo não pode ser vazio.'),
        name: z.string().min(1, 'Este campo não pode ser vazio.'),
        cellphone: z
          .string()
          .min(1, 'Este campo não pode ser vazio.')
          .min(14, 'Número inválido.')
          .max(15, 'Número inválido.')
          .transform((value) => value.replace(/[\s()-]/g, '')),
        age: z.coerce
          .number()
          .gt(0, 'A idade deve ser maior que 0.')
          .lte(120, 'A idade deve ser menor que 120.'),
        responsable: z.boolean(),
      }),
    ),
  })
  .superRefine((schema, ctx) => {
    const responsableHouseds = schema.houseds.filter(
      (housed) => housed.responsable,
    )
    const atLeastOneResponsable = responsableHouseds.length > 0

    if (!atLeastOneResponsable) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Deve haver pelo menos um responsável pela família.',
        fatal: true,
        path: ['global'],
      })

      return z.NEVER
    }

    const onlyOneResponsable = responsableHouseds.length === 1

    if (!onlyOneResponsable) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Só deve haver um único responsável pela família.',
        path: ['global'],
      })
    }
  })

export type RegisterFamilySchema = z.infer<typeof registerFamilySchema>
