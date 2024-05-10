import { buttonVariants } from '@/components/ui/button'
import { navConfig } from '@/config/nav'
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Header() {
  return (
    <header className="-mb-1 flex h-52 w-full flex-col items-center justify-center gap-4 bg-celeste px-4 pt-0 text-zinc-50 xl:h-24 xl:flex-row xl:justify-between xl:px-44 xl:pt-7">
      <Link
        href={siteRoutes.public.landingPage}
        className="cursor-pointer select-none text-[40px] font-bold uppercase"
      >
        Resgate RS
      </Link>

      <nav className="flex flex-col items-center gap-6 xl:flex-row xl:gap-8">
        <div className="flex gap-4 xl:gap-8">
          {navConfig.link.map((item) => (
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

        {navConfig.button.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(buttonVariants({ variant: 'outline' }), 'text-xl')}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  )
}
