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
    if (response.result === 0) {
      toast.error(response.message)
      return
    }

    router.push(siteRoutes.protected.families)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col items-center gap-4"
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem className="w-7/12">
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
            <FormItem className="w-7/12">
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
            'text-xl mt-6 uppercase',
          )}
          disabled={isPending}
        >
          {isPending && <Spinner className="mr-2" />}
          Entrar
        </Button>
      </form>
    </Form>
  )
}
