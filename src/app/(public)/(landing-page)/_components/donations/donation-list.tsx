'use client'

import { listDonations } from '@/api/list-donations'
import { donationsListPageSize } from '@/config/donations'
import { useQuery } from '@tanstack/react-query'
import { useGeolocated } from 'react-geolocated'
import { ErrorContainer } from '../error-container'
import { DonationListSkeleton } from './donastion-list-skeleton'
import { DonationItem } from './donation-item'

export function DonationList() {
  const { coords } = useGeolocated()
  const { data, error, isPending } = useQuery({
    queryKey: ['list-donations', coords?.latitude, coords?.longitude],
    queryFn: () =>
      listDonations({
        pageSize: donationsListPageSize,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      }),
  })

  return (
    <>
      {isPending && <DonationListSkeleton />}
      {!isPending && !!error && <ErrorContainer message={error.message} />}
      {!isPending &&
        !error &&
        (data && data.result === 1 ? (
          data.data.map((donation) => (
            <DonationItem key={donation.shelterId} donation={donation} />
          ))
        ) : (
          <ErrorContainer message={data.message} />
        ))}
    </>
  )
}
