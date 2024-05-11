import { listFamilies } from '@/api/list-families'
import { listFamiliesGlobal } from '@/api/list-families-global'
import { ErrorContainer } from '@/app/(public)/(landing-page)/_components/error-container'
import { FamilyListSkeleton } from './families-list-skeleton'
import { FamilyItem } from './family-item'

type Props = {
  isPending: boolean
  response?:
    | Awaited<ReturnType<typeof listFamilies>>
    | Awaited<ReturnType<typeof listFamiliesGlobal>>
}

export function List({ isPending, response }: Props) {
  return (
    <>
      {isPending ? (
        <FamilyListSkeleton />
      ) : (
        <>
          {response && response.result !== 1 && (
            <ErrorContainer message={response.message} />
          )}

          {response && response.result === 1 && (
            <>
              {response.data.length > 0 ? (
                response.data.map((family) => (
                  <FamilyItem key={family.familyId} family={family} />
                ))
              ) : (
                <div className="flex items-center justify-center text-lg">
                  Nenhuma família encontrada.
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
