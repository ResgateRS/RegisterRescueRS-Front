'use client'

import { addShelterNeeds } from '@/api/add-shelter-needs'
import { Spinner } from '@/components/spinner'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  RegisterNeedsSchema,
  registerNeedsSchema,
} from '@/schemas/register-needs-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  shelterId: string
  authToken: string
}

export function RegisterNeedsForm({ shelterId, authToken }: Props) {
  const { mutateAsync: registerShelterNeeds, isPending } = useMutation({
    mutationKey: ['register-needs'],
    mutationFn: addShelterNeeds,
  })

  const form = useForm<RegisterNeedsSchema>({
    resolver: zodResolver(registerNeedsSchema),
    defaultValues: {
      acceptingUnsheltered: false,
      acceptingVolunteers: false,
      acceptingDoctors: false,
      acceptingVeterinary: false,
      formLink: '',
      donationsDescription: '',
    },
  })

  async function onSubmit(data: RegisterNeedsSchema) {
    const { result } = await registerShelterNeeds({
      shelterId,
      acceptingVolunteers: data.acceptingVolunteers,
      acceptingDoctors: data.acceptingDoctors,
      acceptingVeterinarians: data.acceptingVeterinary,
      acceptingDonations: data.donationsDescription !== '',
      donationDescription: data.donationsDescription,
      volunteersSubscriptionLink: data.formLink,
      authToken,
    })

    if (result === 1) {
      toast.success('Necessidades inseridas com sucesso!')
      return
    }

    toast.error('Houve um erro ao inserir necessidades!')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="acceptingUnsheltered"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="acceptingUnsheltered"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label htmlFor="acceptingUnsheltered">
                  Aceitando desabrigados
                </Label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptingVolunteers"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="acceptingVolunteers"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label htmlFor="acceptingVolunteers">
                  Aceitando voluntários
                </Label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptingDoctors"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="acceptingDoctors"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label htmlFor="acceptingDoctors">Aceitando médicos</Label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptingVeterinary"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="acceptingVeterinary"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label htmlFor="acceptingVeterinary">
                  Aceitando veterinários
                </Label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="formLink"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="formLink">Link do formulário (opcional)</Label>
              <FormControl>
                <Input
                  id="formLink"
                  placeholder="forms.google.com/meu-abrigo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col gap-1.5">
          <Label htmlFor="donationsDescription">
            Descrição das Doações (opcional)
          </Label>
          <FormField
            control={form.control}
            name="donationsDescription"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id={field.name}
                    className="resize-none"
                    placeholder="Escreva uma breve descrição sobre as doações..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className={cn(
              buttonVariants({ size: 'sm', variant: 'outlineSecondary' }),
              'mt-2 uppercase',
            )}
            disabled={isPending}
          >
            {isPending && <Spinner className="mr-2" />}
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
