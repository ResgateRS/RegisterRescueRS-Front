'use client'

import { listDonations } from '@/api/list-donations'
import { infiniteDonationsListPageSize } from '@/config/donations'
import { useDonationStore } from '@/hooks/use-donation-store'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useGeolocated } from 'react-geolocated'
import { ErrorContainer } from '../../../../components/core/error-container'
import { DonationItem } from './donation-item'
import { DonationListSkeleton } from './donation-list-skeleton'
import { SearchForm } from './search-form'

export function DonationList() {
  const { searchTerm } = useDonationStore()
  const { coords } = useGeolocated()

  const { data, fetchNextPage, isPending, error, hasNextPage } =
    useInfiniteQuery({
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
    })

  const lastDonationRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastDonationRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && searchTerm.length > 0 && hasNextPage) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage, searchTerm, hasNextPage])

  const donations = data?.pages.flatMap((donation) => donation)

  return (
    <div className="relative flex w-full flex-col gap-6 pb-8">
      <div className="flex w-full flex-col gap-3 lg:gap-0">
        <SearchForm />

        <span className="truncate text-center text-sm lg:text-start">
          {donations &&
            (searchTerm.length > 0
              ? `Procurando por "${searchTerm}".`
              : `Mostrando ${donations.length} resultados.`)}
        </span>
      </div>

      {isPending && <DonationListSkeleton />}
      {!isPending && !!error && <ErrorContainer message={error.message} />}
      {!isPending &&
        !error &&
        donations &&
        (donations.length > 0 ? (
          donations.map((donation, index) => (
            <DonationItem
              ref={index === donations.length - 1 ? ref : null}
              key={donation.shelterId}
              donation={donation}
            />
          ))
        ) : (
          <div className="flex items-center justify-center text-lg">
            Nenhum abrigo encontrado procurando doações.
          </div>
        ))}
    </div>
  )
}
