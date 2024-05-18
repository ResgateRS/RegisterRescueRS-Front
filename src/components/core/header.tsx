import { Separator } from '@/components/ui/separator'
import { RouteVisibility, siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { cn } from '@/lib/utils'
import { jwtUserDataSchema } from '@/schemas/jwt-user-data-schema'
import { JwtPayload } from '@/types/api'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LogoIcon } from '../icons/logo'
import { ResgateLogoIcon } from '../icons/resgate-logo'
import { Nav } from './nav'
import { PwaInstallButton } from './pwa-install-button'

type Props = {
  routeType: RouteVisibility
} & React.ComponentProps<'header'>

export function Header({ routeType, className, ...props }: Props) {
  let isAdmin = false
  if (routeType === 'protected') {
    const token = cookies().get(cookiesNames.session)?.value
    if (!token) {
      redirect(siteRoutes.public.landingPage)
    }
    const decodedToken = jwtDecode<JwtPayload>(token)

    const userData = jwtUserDataSchema.safeParse(
      JSON.parse(decodedToken.userData),
    )

    if (!userData.success) {
      redirect(siteRoutes.public.landingPage)
    }

    if (userData.data.adm) {
      isAdmin = true
    }
  }

  return (
    <header
      data-protected-route={routeType === 'protected'}
      className={cn(
        '-mb-1 flex h-64 sm:h-56 w-full flex-col items-center justify-center gap-4 bg-celeste px-4 pt-1 text-zinc-50 2xl:px-44 ',
        routeType === 'protected'
          ? 'h-80 lg:h-44 2xl:flex-row 2xl:h-28 2xl:justify-between 2xl:pt-0'
          : 'xl:flex-row xl:h-28 xl:justify-between xl:pt-0 xl:px-20',
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
      <PwaInstallButton />

      <Nav routeType={routeType} isAdminUser={isAdmin} />
      {routeType === 'public' && <Separator className="block h-1 lg:hidden" />}
    </header>
  )
}
