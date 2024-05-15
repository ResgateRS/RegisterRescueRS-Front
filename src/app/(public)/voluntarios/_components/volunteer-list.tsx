'use client'

import { listVolunteers } from '@/api/list-volunteers'
import { infiniteVolunteersListPageSize } from '@/config/volunteers'
import { useVolunteerStore } from '@/hooks/use-volunteer-store'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useGeolocated } from 'react-geolocated'
import { ErrorContainer } from '../../(landing-page)/_components/error-container'
import { SearchForm } from './search-form'
import { VolunteerItem } from './volunteer-item'
import { VolunteerListSkeleton } from './volunteer-list-skeleton'

export function VolunteerList() {
  const { searchTerm } = useVolunteerStore()
  const { coords } = useGeolocated()

  const { data, fetchNextPage, hasNextPage, isPending, error } =
    useInfiniteQuery({
      queryKey: [
        'infinite-list-volunteers',
        searchTerm,
        coords?.latitude,
        coords?.longitude,
      ],
      queryFn: async ({ pageParam }) => {
        const response = await listVolunteers({
          pageSize: infiniteVolunteersListPageSize,
          cursor: pageParam,
          latitude: coords?.latitude,
          longitude: coords?.longitude,
          searchTerm,
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

        return lastPage[lastPage.length - 1].shelterId
      },
    })

  const lastVolunteerRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastVolunteerRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && searchTerm.length > 0 && hasNextPage) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage, searchTerm, hasNextPage])

  const volunteers = data?.pages.flatMap((donation) => donation)

  return (
    <div className="relative flex w-full flex-col gap-6 pb-8">
      <div className="flex w-full flex-col gap-3 lg:gap-0">
        <SearchForm />

        <span className="truncate text-center text-sm lg:text-start">
          {volunteers &&
            (searchTerm.length > 0
              ? `Procurando por "${searchTerm}".`
              : `Mostrando ${volunteers.length} resultados.`)}
        </span>
      </div>

      {isPending && <VolunteerListSkeleton />}
      {!isPending && !!error && <ErrorContainer message={error.message} />}
      {!isPending &&
        !error &&
        volunteers &&
        (volunteers.length > 0 ? (
          volunteers.map((volunteer, index) => (
            <VolunteerItem
              ref={index === volunteers.length - 1 ? ref : null}
              key={volunteer.shelterId}
              volunteer={volunteer}
            />
          ))
        ) : (
          <div className="flex items-center justify-center text-lg">
            Nenhum abrigo encontrado.
          </div>
        ))}
    </div>
  )
}
