import { handleLogout } from '@/actions/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { navConfig } from '@/config/nav'
import { RouteVisibility, siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  routeType: RouteVisibility
} & React.ComponentProps<'header'>

export function Header({ routeType, className, ...props }: Props) {
  return (
    <header
      className={cn(
        '-mb-1 flex h-56 w-full flex-col items-center justify-center gap-4 bg-celeste px-4 pt-1 text-zinc-50 lg:h-28 lg:flex-row lg:justify-between lg:px-20 lg:pt-0 xl:px-24 2xl:px-44',
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

      <nav className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <div className="flex gap-4 lg:gap-8">
          {navConfig[routeType].link.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'navLink', size: 'link' }),
                'text-xl',
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {navConfig[routeType].button.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(buttonVariants({ variant: 'outline' }), 'text-xl')}
          >
            {item.title}
          </Link>
        ))}

        {routeType === 'protected' && (
          <form action={handleLogout}>
            <Button
              type="submit"
              className={cn(buttonVariants({ variant: 'outline' }), 'text-xl')}
            >
              Sair
              <LogOutIcon className="ml-2 size-4" />
            </Button>
          </form>
        )}
      </nav>
      <Separator className="block h-1 lg:hidden" />
    </header>
  )
}
