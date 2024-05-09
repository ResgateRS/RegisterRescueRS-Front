'use client'

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button, buttonVariants } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', password: '' },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('[LoginForm SUBMIT >]', values)
  }

  function renderUsername({ field }: any) {
    return (
      <FormItem>
        <FormControl>
          <input placeholder="Usuário" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )
  }

  function renderPassword({ field }: any) {
    return (
      <FormItem>
        <FormControl>
          <input placeholder="Senha" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={renderUsername}
        />
        <FormField
          control={form.control}
          name="password"
          render={renderPassword}
        />
        <Button
          className={cn(buttonVariants({ variant: 'default' }), 'text-xl')}
        >
          ENTRAR
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
