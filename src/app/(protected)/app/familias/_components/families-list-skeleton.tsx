import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  withoutWrapper?: boolean
}

function FamilySkeletonContent() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex h-[196px] w-full items-center justify-between rounded-lg p-10"
        />
      ))}
    </>
  )
}

export function FamilyListSkeleton({ withoutWrapper }: Props) {
  return (
    <>
      {withoutWrapper ? (
        <FamilySkeletonContent />
      ) : (
        <div className="flex w-full flex-col gap-6 px-8">
          <FamilySkeletonContent />
        </div>
      )}
    </>
  )
}
