'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
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

  function renderFormContent({ field }: any) {
    return (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <input placeholder="shadcn" {...field} />
        </FormControl>
        <FormDescription>Descricao formulario</FormDescription>
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
          render={renderFormContent}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  )
}

export default LoginForm
