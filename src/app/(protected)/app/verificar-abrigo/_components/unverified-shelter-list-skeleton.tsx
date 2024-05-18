import { Skeleton } from '@/components/ui/skeleton'
import { unverifiedSheltersListPageSize } from '@/config/shelters'

export function UnverifiedShelterListSkeleton() {
  return (
    <>
      {Array.from({ length: unverifiedSheltersListPageSize }).map(
        (_, index) => (
          <Skeleton key={index} className="mb-2 h-14 w-full rounded-none" />
        ),
      )}
    </>
  )
}
