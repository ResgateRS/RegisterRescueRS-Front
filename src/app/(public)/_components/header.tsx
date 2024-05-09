import { buttonVariants } from '@/components/ui/button'
import { navConfig } from '@/config/nav'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-celeste px-44 pt-7 text-zinc-50">
      <h1 className="text-[40px] font-bold uppercase">Resgate RS</h1>

      <nav className="flex items-center gap-8">
        {navConfig.map((item) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.title}
                href={item.href}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: 'link', size: 'link' }),
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
              target="_blank"
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
