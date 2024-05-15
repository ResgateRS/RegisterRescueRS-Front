import { Skeleton } from '@/components/ui/skeleton'
import { infiniteDonationsListPageSize } from '@/config/donations'

export function DonationListSkeleton() {
  return (
    <>
      {Array.from({ length: infiniteDonationsListPageSize }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex h-72 w-full items-center justify-between rounded-lg p-10"
        />
      ))}
    </>
  )
}
