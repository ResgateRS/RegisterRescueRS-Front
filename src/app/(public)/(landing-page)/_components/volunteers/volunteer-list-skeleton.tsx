import { Skeleton } from '@/components/ui/skeleton'
import { volunteersListPageSize } from '@/config/volunteers'

export function VolunteerListSkeleton() {
  return (
    <>
      {Array.from({ length: volunteersListPageSize }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-72 w-96 rounded-2xl px-4 py-3 xl:h-60 xl:w-[600px] xl:py-10 2xl:h-64 2xl:w-[790px]"
        />
      ))}
    </>
  )
}
