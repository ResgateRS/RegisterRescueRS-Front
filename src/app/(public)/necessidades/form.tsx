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
  acceptingUnsheltered: z.boolean(),
})

function NeedsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { acceptingUnsheltered: false },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('[LoginForm SUBMIT >]', values)
  }

  function renderAcceptingUnsheltered({ field }: any) {
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
          name="acceptingUnsheltered"
          render={renderAcceptingUnsheltered}
        />
        <Button
          className={cn(buttonVariants({ variant: 'default' }), 'text-xl')}
        >
          SALVAR
        </Button>
      </form>
    </Form>
  )
}

export default NeedsForm
