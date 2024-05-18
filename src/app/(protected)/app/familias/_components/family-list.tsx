'use client'

import { listFamilies } from '@/api/list-families'
import { ErrorContainer } from '@/components/core/error-container'
import { buttonVariants } from '@/components/ui/button'
import { infiniteFamiliesListPageSize } from '@/config/families'
import { siteRoutes } from '@/config/site'
import { useFamilyStore } from '@/hooks/use-family-store'
import { cn } from '@/lib/utils'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useGeolocated } from 'react-geolocated'
import { FamilyListSkeleton } from './families-list-skeleton'
import { FamilyItem } from './family-item'
import { SearchForm } from './search-form'

type Props = {
  authToken: string
}

export function FamilyList({ authToken }: Props) {
  const { searchValues } = useFamilyStore()
  const { coords } = useGeolocated()

  const { data, fetchNextPage, isPending, error, hasNextPage } =
    useInfiniteQuery({
      queryKey: [
        'infinite-list-families',
        searchValues.scope,
        searchValues.searchTerm,
        coords?.latitude,
        coords?.longitude,
      ],
      queryFn: async ({ pageParam }) => {
        const response = await listFamilies({
          global: searchValues.scope === 'global',
          pageSize: infiniteFamiliesListPageSize,
          cursor: pageParam,
          authToken,
          searchTerm:
            searchValues.searchTerm.length === 0
              ? null
              : searchValues.searchTerm,
          latitude: coords?.latitude,
          longitude: coords?.longitude,
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
    })

  const lastFamilyRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastFamilyRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage, hasNextPage])

  const families = data?.pages.flatMap((family) => family)

  return (
    <div className="relative flex w-full flex-col gap-6 pb-8">
      <div className="flex w-full flex-col gap-3 lg:gap-0">
        <div className="flex flex-col-reverse justify-between xl:flex-row xl:items-center">
          <SearchForm />
          <Link
            href={siteRoutes.protected.registerFamily}
            className={cn(
              buttonVariants({ size: 'sm', variant: 'link' }),
              'p-0',
            )}
          >
            <PlusIcon className="mr-2 size-4" />
            Nova família
          </Link>
        </div>

        <span className="truncate text-center text-sm lg:text-start">
          {families &&
            `Procurando ${searchValues.searchTerm.length > 0 ? `por "${searchValues.searchTerm}"` : ''} ${searchValues.scope === 'local' ? 'neste abrigo.' : 'em todos os abrigos.'}`}
        </span>
      </div>

      {isPending && <FamilyListSkeleton />}
      {!isPending && !!error && <ErrorContainer message={error.message} />}
      {!isPending &&
        !error &&
        families &&
        (families.length > 0 ? (
          families.map((family, index) => (
            <FamilyItem
              ref={index === families.length - 1 ? ref : null}
              key={family.familyId}
              family={family}
              showShelter={searchValues.scope === 'global'}
            />
          ))
        ) : (
          <div className="flex items-center justify-center text-lg">
            Nenhuma família encontrada.
          </div>
        ))}
    </div>
  )
}
