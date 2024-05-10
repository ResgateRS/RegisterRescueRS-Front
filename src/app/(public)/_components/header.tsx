import { buttonVariants } from '@/components/ui/button'
import { navConfig } from '@/config/nav'
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-celeste px-44 pt-7 text-zinc-50">
      <Link
        href={siteRoutes.public.landingPage}
        className="cursor-pointer select-none text-[40px] font-bold uppercase"
      >
        Resgate RS
      </Link>

      <nav className="flex items-center gap-8">
        {navConfig.map((item) => {
          if (item.type === 'link') {
            return (
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
            )
          }

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(buttonVariants({ variant: 'outline' }), 'text-xl')}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
