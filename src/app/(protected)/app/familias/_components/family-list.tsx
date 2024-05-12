'use client'

import { ListFamiliesResponse, listFamilies } from '@/api/list-families'
import { familiesListPageSize } from '@/config/families'
import { SearchFamilySchema } from '@/schemas/search-family-schema'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { FamilyListSkeleton } from './families-list-skeleton'
import { FamilyItem } from './family-item'
import { SearchForm } from './search-form'

type Props = {
  authToken: string
  initialData: ListFamiliesResponse
}

export function FamilyList({ authToken, initialData }: Props) {
  const [searchValues, setSearchValues] = useState<SearchFamilySchema>({
    searchTerm: '',
    scope: 'local',
  })

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['infinite-list-families', searchValues],
    queryFn: async ({ pageParam }) => {
      const response = await listFamilies({
        global: searchValues.scope === 'global',
        pageSize: familiesListPageSize,
        cursor: pageParam,
        authToken,
        searchTerm: searchValues.searchTerm,
      })

      if (response.result === 1) {
        return response.data
      }

      throw Error(response.message)
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) {
        return undefined
      }

      return lastPage[lastPage.length - 1].familyId
    },
    enabled: searchValues.searchTerm.length > 0,
  })

  const lastFamilyRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastFamilyRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && searchValues.searchTerm.length > 0) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage, searchValues])

  const families =
    searchValues.searchTerm.length > 0
      ? data?.pages.flatMap((family) => family)
      : initialData

  return (
    <div className="relative flex w-full flex-col gap-6 pb-8">
      <div className="flex w-full flex-col gap-3 lg:gap-0">
        <SearchForm
          searchValues={searchValues}
          setSearchValues={setSearchValues}
        />

        <span className="truncate text-center text-sm lg:text-start">
          {searchValues.searchTerm.length > 0
            ? `Procurando por "${searchValues.searchTerm}" ${searchValues.scope === 'local' ? 'neste abrigo.' : 'em todos os abrigos.'}`
            : `Mostrando ${familiesListPageSize} resultados neste abrigo.`}
        </span>
      </div>

      {families ? (
        families.length === 0 ? (
          <div className="flex items-center justify-center text-lg">
            Nenhuma família encontrada.
          </div>
        ) : (
          families.map((family, index) => (
            <FamilyItem
              ref={index === families.length - 1 ? ref : null}
              key={family.familyId}
              family={family}
            />
          ))
        )
      ) : (
        <FamilyListSkeleton withoutWrapper />
      )}
    </div>
  )
}
