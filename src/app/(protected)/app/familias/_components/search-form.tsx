'use client'

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
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchScope, setSearchScope] = useState<'this' | 'all'>('this')

  const form = useForm<SearchFamilySchema>({
    resolver: zodResolver(searchFamilySchema),
    defaultValues: {
      housedSearchTerm: '',
      scope: 'this',
    },
  })
  return (
    <div className="flex items-center gap-2">
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-96 border-celeste bg-zinc-50 placeholder:text-zinc-400"
        placeholder="Buscar abrigado (Nome ou Telefone)"
      />
      <Select
        value={searchScope}
        onValueChange={(value) => {
          if (value === 'this' || value === 'all') {
            setSearchScope(value)
          }
        }}
      >
        <SelectTrigger className="w-52 border-2 border-celeste bg-zinc-50">
          <SelectValue placeholder="Escolha o escopo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this">Este abrigo</SelectItem>
          <SelectItem value="all">Todos os abrigos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
