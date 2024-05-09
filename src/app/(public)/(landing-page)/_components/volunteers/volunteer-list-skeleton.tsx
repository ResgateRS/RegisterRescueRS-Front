import { Skeleton } from '@/components/ui/skeleton'

export function VolunteerListSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-56 w-[500px] gap-2 rounded-2xl px-4 py-10 2xl:h-64 2xl:w-[790px]"
        />
      ))}
    </>
  )
}
