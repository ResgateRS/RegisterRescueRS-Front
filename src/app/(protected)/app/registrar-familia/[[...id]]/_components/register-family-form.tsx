'use client'

import { revalidatePath } from '@/actions/revalidate'
import { deleteFamily } from '@/api/delete-family'
import { ListFamiliesResponse } from '@/api/list-families'
import { ListFamilyDetailsResponse } from '@/api/list-family-details'
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
import { siteRoutes } from '@/config/site'
import { cellphoneMask } from '@/functions/cellphone-mask'
import { useFamilyStore } from '@/hooks/use-family-store'
import { cn } from '@/lib/utils'
import {
  RegisterFamilySchema,
  registerFamilySchema,
} from '@/schemas/register-family-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { PlusIcon, SaveIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FieldErrors, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'

type Props = {
  authToken: string
  family?: ListFamilyDetailsResponse
}

export function RegisterFamilyForm({ authToken, family }: Props) {
  const { searchValues } = useFamilyStore()
  const queryClient = useQueryClient()
  const router = useRouter()

  const closeDialog = () => {
    router.back()
    router.refresh()
  }

  const { mutateAsync: registerFamily, isPending: isPendingRegisterFamily } =
    useMutation({
      mutationKey: ['register-family'],
      mutationFn: updateFamily,
    })

  const {
    mutateAsync: deleteFamilyMutation,
    isPending: isPendingDeleteFamily,
  } = useMutation({
    mutationKey: ['delete-family'],
    mutationFn: deleteFamily,
  })

  const form = useForm<RegisterFamilySchema>({
    resolver: zodResolver(registerFamilySchema),
    defaultValues: {
      familyId: family?.familyId,
      houseds: family
        ? family.houseds.map((housed) => ({
            ...housed,
            cellphone: housed.cellphone ? cellphoneMask(housed.cellphone) : '',
          }))
        : [
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
      toast.success(
        family
          ? 'Família atualizada com sucesso!'
          : 'Família registrada com sucesso!',
      )

      revalidatePath(siteRoutes.protected.families)
      queryClient.invalidateQueries({
        queryKey: ['infinite-list-families'],
      })

      return
    }

    toast.error(message)
  }

  async function onDeleteFamily(
    familyId: ListFamiliesResponse[number]['familyId'],
  ) {
    const { result, message } = await deleteFamilyMutation({
      familyId,
      authToken,
    })

    if (result === 1) {
      toast.success('A família foi excluída!')

      revalidatePath(siteRoutes.protected.families)
      queryClient.setQueryData<InfiniteData<ListFamiliesResponse>>(
        ['infinite-list-families', searchValues.scope, searchValues.searchTerm],
        (state) => {
          if (state) {
            return {
              ...state,
              pages: state.pages.map((page) =>
                page.filter((family) => family.familyId !== familyId),
              ),
            }
          }

          return state
        },
      )
      closeDialog()

      return
    }

    closeDialog()
    toast.error(message)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center p-1"
      >
        <div className="flex max-h-80 flex-col items-center overflow-y-auto rounded-lg border-2 border-zinc-100 p-2 sm:max-h-[32rem] sm:p-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex w-80 flex-col items-center sm:w-[32rem]"
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
            <p className="text-balance text-center text-sm font-medium text-red-700 sm:text-wrap sm:text-start">
              {errors.global.message}
            </p>
          )}
          <div className="mt-2 flex flex-col items-center gap-2 self-center sm:flex-row sm:self-end">
            {family && (
              <Button
                type="button"
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outlineDestructive' }),
                  'uppercase',
                )}
                disabled={isPendingRegisterFamily || isPendingDeleteFamily}
                onClick={() => {
                  onDeleteFamily(family.familyId)
                }}
              >
                {isPendingDeleteFamily ? (
                  <Spinner className="mr-2 fill-red-800" />
                ) : (
                  <TrashIcon className="mr-2 size-4" />
                )}
                Excluir
              </Button>
            )}

            <Button
              type="submit"
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outlineSecondary' }),
                'uppercase',
              )}
              disabled={isPendingRegisterFamily || isPendingDeleteFamily}
            >
              {isPendingRegisterFamily ? (
                <Spinner className="mr-2" />
              ) : (
                <SaveIcon className="mr-2 size-4" />
              )}
              {family ? 'Salvar' : 'Registrar'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
