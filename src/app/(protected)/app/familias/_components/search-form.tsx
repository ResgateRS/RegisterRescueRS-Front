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
import {
  SearchFamilySchema,
  searchFamilySchema,
} from '@/schemas/search-family-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

type Props = {
  searchValues: SearchFamilySchema
  setSearchValues: React.Dispatch<React.SetStateAction<SearchFamilySchema>>
}

export function SearchForm({ searchValues, setSearchValues }: Props) {
  const form = useForm<SearchFamilySchema>({
    resolver: zodResolver(searchFamilySchema),
    defaultValues: {
      searchTerm: searchValues.searchTerm,
      scope: searchValues.scope,
    },
  })

  function onSubmit(data: SearchFamilySchema) {
    setSearchValues(data)
  }

  return (
    <Form {...form}>
      <form
        className="mb-2 flex items-center gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem className="relative space-y-0">
              <FormMessage className="absolute -top-7 left-0" />
              <FormControl>
                <Input
                  className="w-96 border-celeste bg-zinc-50 placeholder:text-zinc-400"
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
            <FormItem className="relative space-y-0">
              <FormMessage className="absolute -top-7 left-0" />
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-52 border-2 border-celeste bg-zinc-50">
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
          className="group flex gap-2 text-lg"
        >
          <SearchIcon className="size-5" />
          Pesquisar
        </Button>
      </form>
    </Form>
  )
}
