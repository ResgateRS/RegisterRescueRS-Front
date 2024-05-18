import { Skeleton } from '@/components/ui/skeleton'
import { donationsListPageSize } from '@/config/donations'

export function UnverifiedShelterListSkeleton() {
  return (
    <>
      {Array.from({ length: donationsListPageSize }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-56 w-[500px] gap-4 rounded-2xl px-4 py-10 2xl:h-60 2xl:w-[630px]"
        />
      ))}
    </>
  )
}
