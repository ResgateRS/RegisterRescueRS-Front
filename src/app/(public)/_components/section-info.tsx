import { Separator } from '@/components/ui/separator'

type Props = {
  title: string
  description: string
}

export function SectionInfo({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-center text-5xl font-bold leading-10 text-celeste lg:text-start 2xl:leading-[56px]">
        {title}
      </h1>
      <Separator className="h-[2px] w-14 bg-zinc-950" />
      <p className="text-balance text-center">{description}</p>
    </div>
  )
}
