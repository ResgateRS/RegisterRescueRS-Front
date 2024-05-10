'use client'

import { listFamilies } from '@/api/list-families'
import { ErrorContainer } from '@/app/(public)/(landing-page)/_components/error-container'
import { useQuery } from '@tanstack/react-query'
import { FamilyListSkeleton } from './families-list-skeleton'
import { FamilyItem } from './family-item'

type Props = {
  authToken: string
}

export function FamilyList({ authToken }: Props) {
  const searchTerm = ''
  const { data: response, isPending } = useQuery({
    queryKey: ['list-families', searchTerm, authToken],
    queryFn: () => listFamilies({ searchTerm, authToken }),
  })

  return (
    <div className="flex w-full flex-col gap-6 px-8">
      {isPending ? (
        <FamilyListSkeleton />
      ) : (
        <>
          {response && response.result !== 1 && (
            <ErrorContainer message={response.message} />
          )}

          {response && response.result === 1 && (
            <>
              {response.data.length > 1 ? (
                response.data.map((family) => (
                  <FamilyItem key={family.familyId} family={family} />
                ))
              ) : (
                <div className="flex items-center justify-center text-lg">
                  Não há famílias cadastradas.
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
