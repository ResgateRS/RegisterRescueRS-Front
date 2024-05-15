import { Separator } from '@/components/ui/separator'
import { RouteVisibility, siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { LogoIcon } from '../icons/logo'
import { ResgateLogoIcon } from '../icons/resgate-logo'
import { Nav } from './nav'

type Props = {
  routeType: RouteVisibility
} & React.ComponentProps<'header'>

export function Header({ routeType, className, ...props }: Props) {
  return (
    <header
      data-protected-route={routeType === 'protected'}
      className={cn(
        '-mb-1 flex h-64 sm:h-56 w-full flex-col items-center justify-center gap-4 bg-celeste px-4 pt-1 text-zinc-50 2xl:px-44 xl:flex-row xl:h-28 xl:justify-between xl:px-20 xl:pt-0',
        routeType === 'protected' && 'h-64 lg:h-44 ',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href={siteRoutes.public.landingPage}
          className="flex cursor-pointer select-none items-center gap-4 text-[40px] font-bold uppercase"
        >
          <LogoIcon className="size-8" />
          Abrigos RS
        </Link>

        <Link
          href={'https://resgaters.app.br/'}
          target="_blank"
          className="flex cursor-pointer select-none items-center gap-1 rounded-lg bg-gradient-to-r from-[#ed8445] to-[#fe3431] p-2 text-base duration-300 hover:scale-105"
        >
          <span className="z-10 text-sm font-light">Conheça o</span>
          <ResgateLogoIcon className="z-10 size-4" />
          <span className="z-10 font-bold uppercase">Resgate RS</span>
        </Link>
      </div>

      <Nav routeType={routeType} />
      {routeType === 'public' && <Separator className="block h-1 lg:hidden" />}
    </header>
  )
}
