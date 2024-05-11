'use client'

import { listFamilies } from '@/api/list-families'
import { listFamiliesGlobal } from '@/api/list-families-global'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { List } from './list'

type Props = {
  authToken: string
}

export function FamilyList({ authToken }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchScope, setSearchScope] = useState<'this' | 'all'>('this')

  const { data: responseListFamilies, isPending: isPendingListFamilies } =
    useQuery({
      queryKey: ['list-families', authToken],
      queryFn: () => listFamilies({ authToken }),
      select: (data) => {
        const filteredFamilies = data.data.filter(
          (family) =>
            family.responsable
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            family.cellphone.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        return {
          ...data,
          data: filteredFamilies,
        }
      },
      enabled: searchScope === 'this',
    })

  const {
    data: responseListFamiliesGlobal,
    isPending: isPendingListFamiliesGlobal,
  } = useQuery({
    queryKey: ['list-families-global', authToken],
    queryFn: () => listFamiliesGlobal({ authToken }),
    select: (data) => {
      const filteredFamilies = data.data.filter(
        (family) =>
          family.responsable.toLowerCase().includes(searchTerm.toLowerCase()) ||
          family.cellphone.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      return {
        ...data,
        data: filteredFamilies,
      }
    },
    enabled: searchScope === 'all',
  })

  return (
    <div className="flex w-full flex-col gap-6 px-8">
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

      <List
        isPending={
          searchScope === 'all'
            ? isPendingListFamiliesGlobal
            : isPendingListFamilies
        }
        response={
          searchScope === 'all'
            ? responseListFamiliesGlobal
            : responseListFamilies
        }
      />
    </div>
  )
}
