'use client'

import { listVolunteers } from '@/api/list-volunteers'
import { volunteersListPageSize } from '@/config/volunteers'
import { useQuery } from '@tanstack/react-query'
import { useGeolocated } from 'react-geolocated'
import { ErrorContainer } from '../../../../../components/core/error-container'
import { VolunteerItem } from './volunteer-item'
import { VolunteerListSkeleton } from './volunteer-list-skeleton'

export function VolunteerList() {
  const { coords } = useGeolocated()
  const { data, error, isPending } = useQuery({
    queryKey: ['list-volunteers', coords?.latitude, coords?.longitude],
    queryFn: () =>
      listVolunteers({
        pageSize: volunteersListPageSize,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      }),
  })

  return (
    <>
      {isPending && <VolunteerListSkeleton />}
      {!isPending && !!error && <ErrorContainer message={error.message} />}
      {!isPending &&
        !error &&
        (data && data.result === 1 ? (
          data.data.map((volunteer) => (
            <VolunteerItem key={volunteer.shelterId} volunteer={volunteer} />
          ))
        ) : (
          <ErrorContainer message={data.message} />
        ))}
    </>
  )
}
