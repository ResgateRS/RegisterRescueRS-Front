'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFamilyStore } from '@/hooks/use-family-store'
import {
  SearchFamilySchema,
  searchFamilySchema,
} from '@/schemas/search-family-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

export function SearchForm() {
  const { searchValues } = useFamilyStore()
  const form = useForm<SearchFamilySchema>({
    resolver: zodResolver(searchFamilySchema),
    defaultValues: {
      searchTerm: searchValues.searchTerm,
      scope: searchValues.scope,
    },
  })

  function onSubmit(data: SearchFamilySchema) {
    useFamilyStore.setState((state) => ({ ...state, searchValues: data }))
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <form
          className="mb-2 flex items-center gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem className="relative w-full space-y-0 lg:w-fit">
                <FormMessage className="absolute -top-6 left-0 w-full text-nowrap" />
                <FormControl>
                  <Input
                    className="w-full border-celeste bg-zinc-50 placeholder:text-zinc-400 lg:w-96"
                    placeholder="Buscar abrigado (Nome ou Telefone)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scope"
            render={({ field }) => (
              <FormItem className="relative w-full space-y-0 lg:w-fit">
                <FormMessage className="absolute -top-6 left-0 w-full text-nowrap" />
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full border-2 border-celeste bg-zinc-50 sm:w-52">
                    <SelectValue placeholder="Escolha o escopo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Este abrigo</SelectItem>
                    <SelectItem value="global">Todos os abrigos</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size={'sm'}
            variant={'outlineSecondary'}
            className="group hidden gap-2 text-lg lg:flex"
          >
            <SearchIcon className="size-5" />
            Pesquisar
          </Button>
        </form>

        <Button
          type="submit"
          size={'sm'}
          variant={'outlineSecondary'}
          className="group flex w-full gap-2 text-lg lg:hidden"
        >
          <SearchIcon className="size-5" />
          Pesquisar
        </Button>
      </div>
    </Form>
  )
}
