'use client'

import { ListFamiliesResponse } from '@/api/list-families'
import { updateFamily } from '@/api/update-family'
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
import { Separator } from '@/components/ui/separator'
import { cellphoneMask } from '@/lib/masks'
import { cn } from '@/lib/utils'
import {
  RegisterFamilySchema,
  registerFamilySchema,
} from '@/schemas/register-family-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { FieldErrors, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'

type Props = {
  authToken: string
  family?: ListFamiliesResponse[number]
}

export function RegisterFamilyForm({ authToken, family }: Props) {
  const { mutateAsync: registerFamily, isPending } = useMutation({
    mutationKey: ['register-family'],
    mutationFn: updateFamily,
  })

  const form = useForm<RegisterFamilySchema>({
    resolver: zodResolver(registerFamilySchema),
    defaultValues: {
      familyId: family?.familyId,
      houseds: [
        {
          id: uuid(),
          name: '',
          age: 1,
          cellphone: '',
          responsable: true,
        },
      ],
    },
  })

  const { control, formState } = form

  const errors = formState.errors as FieldErrors<
    RegisterFamilySchema & { global: number }
  >

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'houseds',
  })

  async function onSubmit(data: RegisterFamilySchema) {
    const { message, result } = await registerFamily({
      ...data,
      authToken,
    })

    if (result === 1) {
      toast.success('Família registrada com sucesso!')
      return
    }

    toast.error(message)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center p-1"
      >
        <div className="flex max-h-[32rem] flex-col items-center overflow-y-auto rounded-lg border border-zinc-100 p-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex w-[32rem] flex-col items-center"
            >
              <div className="flex w-full flex-col rounded-lg bg-zinc-100 p-5">
                <div className="flex w-full items-center justify-between">
                  <Label className="text-lg font-bold">
                    Familiar {index + 1}
                  </Label>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-fit border-none p-0 text-red-500 hover:bg-transparent hover:text-red-800"
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      <TrashIcon className="size-5" />
                    </Button>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name={`houseds.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <Label htmlFor={`houseds.${index}.name`}>
                        Nome completo
                      </Label>
                      <FormControl>
                        <Input
                          id={`houseds.${index}.name`}
                          placeholder="Insira o nome completo do abrigado..."
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
                  name={`houseds.${index}.age`}
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <Label htmlFor={`houseds.${index}.age`}>Idade</Label>
                      <FormControl>
                        <Input
                          id={`houseds.${index}.name`}
                          type="number"
                          placeholder="Insira a idade..."
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
                  name={`houseds.${index}.cellphone`}
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <Label htmlFor={`houseds.${index}.cellphone`}>
                        Telefone
                      </Label>
                      <FormControl>
                        <Input
                          id={`houseds.${index}.cellphone`}
                          type="tel"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="(51) 00000-0000"
                          className="bg-zinc-50"
                          {...field}
                          onChange={(e) => {
                            const { value } = e.target
                            form.setValue(
                              `houseds.${index}.cellphone`,
                              cellphoneMask(value),
                            )
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`houseds.${index}.responsable`}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            id={`houseds.${index}.responsable`}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label htmlFor={`houseds.${index}.responsable`}>
                          Responsável pela família
                        </Label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator
                orientation="vertical"
                className="h-5 w-1 bg-zinc-100"
              />
              {index === fields.length - 1 && (
                <>
                  <Button
                    type="button"
                    className={cn(
                      buttonVariants({ size: 'sm', variant: 'outline' }),
                      'border-zinc-200 text-zinc-500 border-2',
                    )}
                    onClick={() => {
                      append({
                        id: uuid(),
                        name: '',
                        age: 1,
                        cellphone: '',
                        responsable: false,
                      })
                    }}
                  >
                    <PlusIcon className="size-5" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col items-end gap-2">
          {errors.global && (
            <p className="text-sm font-medium text-red-700">
              {errors.global.message}
            </p>
          )}
          <Button
            type="submit"
            className={cn(
              buttonVariants({ size: 'sm', variant: 'outlineSecondary' }),
              'mt-2 uppercase',
            )}
            disabled={isPending}
          >
            {isPending && <Spinner className="mr-2" />}
            Registrar
          </Button>
        </div>
      </form>
    </Form>
  )
}
