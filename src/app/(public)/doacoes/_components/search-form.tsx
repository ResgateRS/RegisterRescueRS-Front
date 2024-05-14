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
import { useDonationStore } from '@/hooks/use-donation-store'
import {
  SearchDonationSchema,
  searchDonationSchema,
} from '@/schemas/search-donation-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

export function SearchForm() {
  const { searchTerm } = useDonationStore()
  const form = useForm<SearchDonationSchema>({
    resolver: zodResolver(searchDonationSchema),
    defaultValues: {
      searchTerm,
    },
  })

  function onSubmit(data: SearchDonationSchema) {
    const { searchTerm } = data
    useDonationStore.setState((state) => ({ ...state, searchTerm }))
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
                    placeholder="Buscar (Abrigo ou Necessidades)"
                    {...field}
                  />
                </FormControl>
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
