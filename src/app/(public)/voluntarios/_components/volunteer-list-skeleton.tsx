import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  withoutWrapper?: boolean
}

function VolunteerSkeletonContent() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex h-80 w-full items-center justify-between rounded-lg p-10"
        />
      ))}
    </>
  )
}

export function VolunteerListSkeleton({ withoutWrapper }: Props) {
  return (
    <>
      {withoutWrapper ? (
        <VolunteerSkeletonContent />
      ) : (
        <div className="flex w-full flex-col gap-6 pb-8">
          <VolunteerSkeletonContent />
        </div>
      )}
    </>
  )
}
