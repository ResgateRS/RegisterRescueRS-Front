'use client'

import { createShelter } from '@/api/create-shelter'
import { Spinner } from '@/components/spinner'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { siteRoutes } from '@/config/site'
import { cellphoneMask } from '@/functions/cellphone-mask'
import { cn } from '@/lib/utils'
import { SignupSchema, signupSchema } from '@/schemas/signup-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function CadastroForm() {
  const { mutateAsync: signup, isPending } = useMutation({
    mutationKey: ['create-shelter'],
    mutationFn: createShelter,
  })

  const router = useRouter()
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      address: '',
      shelterCellphone: '',
      login: '',
      password: '',
      rePassword: '',
    },
  })

  async function onSubmit(data: SignupSchema) {
    const response = await signup(data)
    if (response.result === 1) {
      toast.success(
        'Abrigo cadastrado com sucesso! Entre em contato para podermos validá-lo.',
      )

      router.replace(siteRoutes.public.login, { scroll: false })
      return
    }

    toast.error(response.message)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-4 flex w-full flex-col items-center justify-center space-y-4 lg:mb-0 lg:flex-1"
      >
        <ScrollArea className="flex size-full flex-col items-center justify-center gap-4 sm:h-80 xl:h-96 2xl:h-[28rem]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full px-4">
                <FormLabel>Nome do abrigo</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do abrigo..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full px-4">
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rua Fulano, 10. Cidade, RS..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shelterCellphone"
            render={({ field }) => (
              <FormItem className="w-full px-4">
                <FormLabel>Número de contato</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="(51) 00000-0000"
                    {...field}
                    onChange={(e) => {
                      const { value } = e.target
                      form.setValue('shelterCellphone', cellphoneMask(value))
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem className="w-full px-4">
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite um nome de usuário para login..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full px-4">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem className="w-full px-4 pb-1">
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </ScrollArea>
        <Button
          className={cn(
            buttonVariants({ variant: 'default' }),
            'text-xl xl:mt-2 uppercase w-full rounded-md',
          )}
          disabled={isPending}
        >
          {isPending && <Spinner className="mr-2" />}
          Cadastrar
        </Button>
        <div className="flex w-full items-center justify-end">
          <Link
            href={siteRoutes.public.login}
            className={cn(
              buttonVariants({ variant: 'link', size: 'link' }),
              'text-zinc-50 hover:text-zinc-50/80',
            )}
          >
            Já tem uma conta?
          </Link>
        </div>
      </form>
    </Form>
  )
}
