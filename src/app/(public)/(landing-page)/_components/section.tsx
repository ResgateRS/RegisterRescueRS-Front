import { cn } from '@/lib/utils'

export function Section({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'flex min-h-screen items-center justify-center gap-32 px-44',
        className,
      )}
      {...props}
    />
  )
}
