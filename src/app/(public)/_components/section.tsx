import { cn } from '@/lib/utils'

export function Section({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'flex min-h-screen items-center justify-center px-4 xl:px-44 flex-col gap-3 2xl:gap-10 mb-10',
        className,
      )}
      {...props}
    />
  )
}
