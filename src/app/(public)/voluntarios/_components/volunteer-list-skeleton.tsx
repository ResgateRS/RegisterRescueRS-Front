import { Skeleton } from '@/components/ui/skeleton'
import { infiniteVolunteersListPageSize } from '@/config/volunteers'

export function VolunteerListSkeleton() {
  return (
    <>
      {Array.from({ length: infiniteVolunteersListPageSize }).map(
        (_, index) => (
          <Skeleton
            key={index}
            className="flex h-80 w-full items-center justify-between rounded-lg p-10"
          />
        ),
      )}
    </>
  )
}
