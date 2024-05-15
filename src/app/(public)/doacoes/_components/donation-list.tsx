'use client'

import { ListDonationsResponse, listDonations } from '@/api/list-donations'
import { infiniteDonationsListPageSize } from '@/config/donations'
import { useDonationStore } from '@/hooks/use-donation-store'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useGeolocated } from 'react-geolocated'
import { DonationItem } from './donation-item'
import { DonationListSkeleton } from './donation-list-skeleton'
import { SearchForm } from './search-form'

type Props = {
  initialData: ListDonationsResponse
}

export function DonationList({ initialData }: Props) {
  const { searchTerm } = useDonationStore()
  const { coords } = useGeolocated()

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [
      'infinite-list-donations',
      searchTerm,
      coords?.latitude,
      coords?.longitude,
    ],
    queryFn: async ({ pageParam }) => {
      const response = await listDonations({
        pageSize: infiniteDonationsListPageSize,
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

  const lastDonationRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastDonationRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && searchTerm.length > 0) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage, searchTerm])

  const donations =
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

      {donations ? (
        donations.length === 0 ? (
          <div className="flex items-center justify-center text-lg">
            Nenhum abrigo encontrado procurando doações.
          </div>
        ) : (
          donations.map((donation, index) => (
            <DonationItem
              ref={index === donations.length - 1 ? ref : null}
              key={donation.shelterId}
              donation={donation}
            />
          ))
        )
      ) : (
        <DonationListSkeleton withoutWrapper />
      )}
    </div>
  )
}
