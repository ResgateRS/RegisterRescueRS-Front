import { GreenCheckIcon } from '@/components/icons/green-check'
import { RedXIcon } from '@/components/icons/red-x'

type Props = {
  condition: boolean
  trueDescription: string
  falseDescription: string
}

export function VolunteerNeed({
  condition,
  trueDescription,
  falseDescription,
}: Props) {
  return (
    <div className="gap flex gap-2 text-zinc-950">
      {condition ? (
        <>
          <GreenCheckIcon className="size-5" />
          <span>{trueDescription}</span>
        </>
      ) : (
        <>
          <RedXIcon className="size-5" />
          <span>{falseDescription}</span>
        </>
      )}
    </div>
  )
}
