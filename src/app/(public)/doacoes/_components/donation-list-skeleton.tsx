import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  withoutWrapper?: boolean
}

function DonationSkeletonContent() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex h-64 w-full items-center justify-between rounded-lg p-10"
        />
      ))}
    </>
  )
}

export function DonationListSkeleton({ withoutWrapper }: Props) {
  return (
    <>
      {withoutWrapper ? (
        <DonationSkeletonContent />
      ) : (
        <div className="flex w-full flex-col gap-6 pb-8">
          <DonationSkeletonContent />
        </div>
      )}
    </>
  )
}
