import { z } from 'zod'

export const loginSchema = z.object({
  login: z.string().min(1, 'Este campo não pode ser vazio.'),
  password: z.string().min(1, 'Este campo não pode ser vazio.'),
})

export type LoginSchema = z.infer<typeof loginSchema>
