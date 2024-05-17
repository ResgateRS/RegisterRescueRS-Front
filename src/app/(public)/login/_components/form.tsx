'use client'

import { authenticate } from '@/api/authenticate'
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
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import { LoginSchema, loginSchema } from '@/schemas/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function LoginForm() {
  const { mutateAsync: authenticateUser, isPending } = useMutation({
    mutationKey: ['authenticate'],
    mutationFn: authenticate,
  })

  const router = useRouter()
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginSchema) {
    const response = await authenticateUser(data)

    if (response.result === 98) {
      toast.error(
        'Sua conta ainda não foi validada. Entre em contato com a gente!',
      )
      return
    }

    if (response.result !== 1) {
      toast.error(response.message)
      return
    }

    router.push(siteRoutes.protected.families)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-4 lg:flex-1"
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem className="w-7/12 lg:w-10/12 2xl:max-w-lg">
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu usuário..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-7/12 lg:w-10/12 2xl:max-w-lg">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={cn(
            buttonVariants({ variant: 'default' }),
            'text-xl xl:mt-2 uppercase w-7/12 lg:w-10/12 2xl:max-w-lg rounded-md',
          )}
          disabled={isPending}
        >
          {isPending && <Spinner className="mr-2" />}
          Entrar
        </Button>
        <div className="flex w-7/12 items-center justify-end lg:w-10/12 2xl:max-w-lg">
          <Link
            href={siteRoutes.public.signup}
            className={cn(
              buttonVariants({ variant: 'link', size: 'link' }),
              'text-zinc-50 hover:text-zinc-50/80',
            )}
          >
            Não tem uma conta?
          </Link>
        </div>
      </form>
    </Form>
  )
}
