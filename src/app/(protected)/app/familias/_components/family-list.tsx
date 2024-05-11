'use client'

import { ListFamiliesResponse, listFamilies } from '@/api/list-families'
import { listFamiliesGlobal } from '@/api/list-families-global'
import { SearchFamilySchema } from '@/schemas/search-family-schema'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
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
      const data = {
        global: searchValues.scope === 'global',
        pageSize: 4,
        cursor: pageParam,
        authToken,
        searchTerm: searchValues.searchTerm,
      }
      const response =
        searchValues.scope === 'local'
          ? await listFamilies(data)
          : await listFamiliesGlobal(data)

      if (response.result === 1) {
        return response.data
      }

      throw Error(response.message)
    },
    initialPageParam: '',
    initialData: {
      pages:
        searchValues.searchTerm === '' && searchValues.scope === 'local'
          ? [initialData]
          : [],
      pageParams: [''],
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length === 0) {
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

  const families = data?.pages.flatMap((family) => family)

  return (
    <div className="flex w-full flex-col gap-6 px-8">
      <SearchForm
        searchValues={searchValues}
        setSearchValues={setSearchValues}
      />

      {families.map((family, index) => (
        <FamilyItem
          ref={index === families.length - 1 ? ref : null}
          key={family.familyId}
          family={family}
        />
      ))}
    </div>
  )
}
