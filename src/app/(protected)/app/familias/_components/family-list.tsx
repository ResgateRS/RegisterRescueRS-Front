'use client'

import { ListFamiliesResponse, listFamilies } from '@/api/list-families'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { FamilyItem } from './family-item'
import { SearchForm } from './search-form'

type Props = {
  authToken: string
  initialData: ListFamiliesResponse
}

export function FamilyList({ authToken, initialData }: Props) {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['infinite-list-families'],
    queryFn: async ({ pageParam }) => {
      const response = await listFamilies({
        pageSize: 4,
        cursor: pageParam,
        authToken,
      })

      if (response.result === 1) {
        return response.data
      }

      throw Error(response.message)
    },
    initialPageParam: '',
    initialData: {
      pages: [initialData],
      pageParams: [''],
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) {
        return undefined
      }

      return lastPage[lastPage.length - 1].familyId
    },
  })

  const lastFamilyRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastFamilyRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  const families = data?.pages.flatMap((family) => family)

  return (
    <div className="flex w-full flex-col gap-6 px-8">
      <SearchForm />

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
