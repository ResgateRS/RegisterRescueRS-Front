'use client'

import { ListNeedsResponse, listNeeds } from '@/api/list-needs'
import { updateShelterNeeds } from '@/api/update-shelter-needs'
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
import { FormattedBaseApiResponse } from '@/types/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  shelterId: string
  authToken: string
}

export function RegisterNeedsForm({ shelterId, authToken }: Props) {
  const queryClient = useQueryClient()

  const {
    data: needs,
    isPending: isPendingNeeds,
    isError,
  } = useQuery({
    queryKey: ['list-needs', authToken],
    queryFn: () => listNeeds({ authToken }),
  })

  const { mutateAsync: registerShelterNeeds, isPending } = useMutation({
    mutationKey: ['register-needs'],
    mutationFn: updateShelterNeeds,
  })

  const form = useForm<RegisterNeedsSchema>({
    resolver: zodResolver(registerNeedsSchema),
    defaultValues: {
      shelterId,
      acceptingDoctors: false,
      acceptingDonations: false,
      acceptingUnsheltered: false,
      acceptingVeterinary: false,
      acceptingVolunteers: false,
      donationsDescription: '',
      formLink: '',
    },
  })

  const { reset } = form

  async function onSubmit(data: RegisterNeedsSchema) {
    const { result, message } = await registerShelterNeeds({
      ...data,
      authToken,
    })

    if (result === 1) {
      toast.success('Necessidades salvas com sucesso!')

      queryClient.setQueryData<FormattedBaseApiResponse<ListNeedsResponse>>(
        ['list-needs', authToken],
        (state) => {
          if (state) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { shelterId: _, ...newData } = data
            return { ...state, data: newData }
          }

          return state
        },
      )
      return
    }

    toast.error(message)
  }

  useEffect(() => {
    if (needs && needs.result === 1) {
      reset({
        shelterId,
        formLink: needs.data.formLink ?? '',
        donationsDescription: needs.data.donationsDescription ?? '',
        ...needs.data,
      })
    }
  }, [needs, reset, shelterId])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        {isPendingNeeds && (
          <p className="text-sm font-light">Carregando seus dados...</p>
        )}

        {!isPendingNeeds && ((needs && needs.result !== 1) || isError) && (
          <p className="text-sm font-light text-red-500">
            Não foi possível carregar seus dados.
          </p>
        )}

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
          name="acceptingDonations"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    id="acceptingDonations"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label htmlFor="acceptingDonations">Aceitando doações</Label>
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
