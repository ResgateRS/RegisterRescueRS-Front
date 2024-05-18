'use client'

import { listUnverifiedShelters } from '@/api/list-unverified-shelters'
import { ErrorContainer } from '@/components/core/error-container'
import { Accordion } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { UnverifiedShelterItem } from './unverified-shelter-item'
import { UnverifiedShelterListSkeleton } from './unverified-shelter-list-skeleton'

type Props = {
  authToken: string
}

export function UnverifiedShelterList({ authToken }: Props) {
  const {
    data,
    isPending: isPendingUnverifiedShelters,
    error,
  } = useQuery({
    queryKey: ['list-unverified-shelters', authToken],
    queryFn: () => listUnverifiedShelters({ authToken }),
  })

  return (
    <>
      {isPendingUnverifiedShelters && (
        <ScrollArea className="h-96">
          <UnverifiedShelterListSkeleton />
        </ScrollArea>
      )}
      {!isPendingUnverifiedShelters && !!error && (
        <ErrorContainer message={error.message} />
      )}
      {!isPendingUnverifiedShelters &&
        !error &&
        (data && data.result === 1 ? (
          data.data.length > 0 ? (
            <ScrollArea className="h-96">
              <Accordion type="single" collapsible className="w-full">
                {data.data.map((unverifiedShelter) => (
                  <UnverifiedShelterItem
                    key={unverifiedShelter.shelterId}
                    unverifiedShelter={unverifiedShelter}
                    authToken={authToken}
                  />
                ))}
              </Accordion>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center text-lg">
              Nenhum abrigo não-verificado encontrado.
            </div>
          )
        ) : (
          <ErrorContainer message={data.message} />
        ))}
    </>
  )
}
