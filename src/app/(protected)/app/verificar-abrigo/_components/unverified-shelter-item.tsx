'use client'

import { ListUnverifiedSheltersResponse } from '@/api/list-unverified-shelters'
import { verifyShelter } from '@/api/verify-shelter'
import { Spinner } from '@/components/spinner'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cellphoneMask } from '@/functions/cellphone-mask'
import {
  VerifyShelterSchema,
  verifyShelterSchema,
} from '@/schemas/verify-shelter-schema'
import { FormattedBaseApiResponse } from '@/types/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  unverifiedShelter: ListUnverifiedSheltersResponse[number]
  authToken: string
}

export function UnverifiedShelterItem({ unverifiedShelter, authToken }: Props) {
  const { mutateAsync: verifyShelterMutation, isPending } = useMutation({
    mutationKey: ['verify-shelter'],
    mutationFn: verifyShelter,
  })

  const queryClient = useQueryClient()
  const phoneNumber = cellphoneMask(unverifiedShelter.shelterCellphone)
  const form = useForm<VerifyShelterSchema>({
    resolver: zodResolver(verifyShelterSchema),
    defaultValues: {
      shelterId: unverifiedShelter.shelterId,
      latitude: 0,
      longitude: 0,
    },
  })

  async function onSubmit(data: VerifyShelterSchema) {
    const { result, message } = await verifyShelterMutation({
      ...data,
      authToken,
    })

    if (result === 1) {
      toast.success('Abrigo verificado!')

      queryClient.setQueryData<
        FormattedBaseApiResponse<ListUnverifiedSheltersResponse>
      >(['list-unverified-shelters', authToken], (state) => {
        if (state) {
          return {
            ...state,
            data: state.data.filter(
              (shelter) => shelter.shelterId !== data.shelterId,
            ),
          }
        }

        return state
      })
      return
    }

    toast.error(message)
  }

  return (
    <AccordionItem value={unverifiedShelter.shelterId}>
      <AccordionTrigger>{unverifiedShelter.shelterName}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2">
        <div className="space-y-1">
          <span className="font-bold">Endereço: </span>
          <p>{unverifiedShelter.address}</p>
        </div>

        <div className="space-y-1">
          <span className="font-bold">Número de contato: </span>
          <p>{phoneNumber}</p>
        </div>

        <Form {...form}>
          <form
            className="flex items-end gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="mt-2 px-1">
                  <Label htmlFor="latitude">Latitude</Label>
                  <FormControl>
                    <Input
                      id="latitude"
                      type="number"
                      className="bg-zinc-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="mt-2 px-1">
                  <Label htmlFor="longitude">Longitude</Label>
                  <FormControl>
                    <Input
                      id="longitude"
                      type="number"
                      className="bg-zinc-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="sm"
              variant="outlineSecondary"
              className="rounded border-emerald-700 px-4 py-2 text-emerald-700 hover:bg-emerald-700"
              disabled={isPending}
            >
              {isPending && <Spinner className="mr-2" />}
              Verificar
            </Button>
          </form>
        </Form>
      </AccordionContent>
    </AccordionItem>
  )
}
