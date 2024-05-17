import { z } from 'zod'

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Este campo não pode ser vazio.')
      .max(60, 'Você só pode escrever até 60 caracteres neste campo.'),
    login: z
      .string()
      .min(1, 'Este campo não pode ser vazio.')
      .max(30, 'Você só pode escrever até 30 caracteres neste campo.'),
    password: z
      .string()
      .min(1, 'Este campo não pode ser vazio.')
      .min(3, 'A senha deve ter no mínimo 3 caracteres.')
      .max(30, 'Você só pode escrever até 30 caracteres neste campo.'),
    rePassword: z
      .string()
      .min(1, 'Este campo não pode ser vazio.')
      .min(3, 'A senha deve ter no mínimo 3 caracteres.')
      .max(30, 'Você só pode escrever até 30 caracteres neste campo.'),
    address: z
      .string()
      .min(1, 'Este campo não pode ser vazio.')
      .max(300, 'Você só pode escrever até 300 caracteres neste campo.'),
    shelterCellphone: z
      .string()
      .min(1, 'Este campo não pode ser vazio.')
      .min(14, 'Número inválido.')
      .max(15, 'Número inválido.')
      .transform((value) => value.replace(/[\s()-]/g, '')),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'As senhas não coincidem.',
    path: ['rePassword'],
  })

export type SignupSchema = z.infer<typeof signupSchema>
