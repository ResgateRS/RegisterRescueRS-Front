'use client'

import { handleLogout } from '@/actions/auth'
import { navConfig } from '@/config/nav'
import { RouteVisibility } from '@/config/site'
import { cn } from '@/lib/utils'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, buttonVariants } from '../ui/button'

type Props = {
  routeType: RouteVisibility
}

export function Nav({ routeType }: Props) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
      <div
        data-protected-route={routeType === 'protected'}
        className="flex gap-4 data-[protected-route=true]:flex-col lg:gap-8 lg:data-[protected-route=true]:flex-row"
      >
        {navConfig[routeType].link.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'navLink', size: 'link' }),
              'text-xl after:bg-zinc-50/50 text-zinc-50/50 lg:after:bg-white lg:text-zinc-50',
              ((pathname.includes(item.href) && item.href !== '/') ||
                pathname === item.href) &&
                'lg:after:w-full after:bg-white text-zinc-50',
            )}
            scroll={false}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {navConfig[routeType].button.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'text-xl',
            (pathname.includes(item.href) || pathname === item.href) &&
              'bg-zinc-100 text-celeste',
          )}
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
  )
}
