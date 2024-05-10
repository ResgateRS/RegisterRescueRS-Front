import { Skeleton } from '@/components/ui/skeleton'

export function FamilyListSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex h-[196px] w-full items-center justify-between rounded-lg p-10"
        />
      ))}
    </>
  )
}
