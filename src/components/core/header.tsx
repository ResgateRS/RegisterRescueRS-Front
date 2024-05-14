import { Separator } from '@/components/ui/separator'
import { RouteVisibility, siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Nav } from './nav'

type Props = {
  routeType: RouteVisibility
} & React.ComponentProps<'header'>

export function Header({ routeType, className, ...props }: Props) {
  return (
    <header
      data-protected-route={routeType === 'protected'}
      className={cn(
        '-mb-1 flex h-56 w-full flex-col items-center justify-center gap-4 bg-celeste px-4 pt-1 text-zinc-50 xl:px-24 2xl:px-44',
        routeType === 'protected'
          ? 'h-64 lg:h-44 xl:h-28 xl:flex-row xl:justify-between xl:px-20 xl:pt-0'
          : 'lg:h-28 lg:flex-row lg:justify-between lg:px-20 lg:pt-0',
        className,
      )}
      {...props}
    >
      <Link
        href={siteRoutes.public.landingPage}
        className="cursor-pointer select-none text-[40px] font-bold uppercase"
      >
        Resgate RS
      </Link>

      <Nav routeType={routeType} />
      {routeType === 'public' && <Separator className="block h-1 lg:hidden" />}
    </header>
  )
}
