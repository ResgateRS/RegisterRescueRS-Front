import { Skeleton } from '@/components/ui/skeleton'
import { infiniteFamiliesListPageSize } from '@/config/families'

export function FamilyListSkeleton() {
  return (
    <>
      {Array.from({ length: infiniteFamiliesListPageSize }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex h-[196px] w-full items-center justify-between rounded-lg p-10"
        />
      ))}
    </>
  )
}
