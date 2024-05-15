'use client'

import { ListVolunteersResponse, listVolunteers } from '@/api/list-volunteers'
import { volunteersListPageSize } from '@/config/volunteers'
import { useVolunteerStore } from '@/hooks/use-volunteer-store'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useGeolocated } from 'react-geolocated'
import { SearchForm } from './search-form'
import { VolunteerItem } from './volunteer-item'
import { VolunteerListSkeleton } from './volunteer-list-skeleton'

type Props = {
  initialData: ListVolunteersResponse
}

export function VolunteerList({ initialData }: Props) {
  const { searchTerm } = useVolunteerStore()
  const { coords } = useGeolocated()

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [
      'infinite-list-volunteer',
      searchTerm,
      coords?.latitude,
      coords?.longitude,
    ],
    queryFn: async ({ pageParam }) => {
      const response = await listVolunteers({
        pageSize: volunteersListPageSize,
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
    enabled: searchTerm.length > 0,
  })

  const lastVolunteerRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastVolunteerRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && searchTerm.length > 0) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage, searchTerm])

  const volunteers =
    searchTerm.length > 0
      ? data?.pages.flatMap((donation) => donation)
      : initialData

  return (
    <div className="relative flex w-full flex-col gap-6 pb-8">
      <div className="flex w-full flex-col gap-3 lg:gap-0">
        <SearchForm />

        <span className="truncate text-center text-sm lg:text-start">
          {searchTerm.length > 0
            ? `Procurando por "${searchTerm}".`
            : `Mostrando ${initialData.length} resultados.`}
        </span>
      </div>

      {volunteers ? (
        volunteers.length === 0 ? (
          <div className="flex items-center justify-center text-lg">
            Nenhum abrigo encontrado procurando voluntário.
          </div>
        ) : (
          volunteers.map((volunteer, index) => (
            <VolunteerItem
              ref={index === volunteers.length - 1 ? ref : null}
              key={volunteer.shelterId}
              volunteer={volunteer}
            />
          ))
        )
      ) : (
        <VolunteerListSkeleton withoutWrapper />
      )}
    </div>
  )
}
