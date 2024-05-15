import { LogoIcon } from '@/components/icons/logo'
import { buttonVariants } from '@/components/ui/button'
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-celeste">
      <div className="relative flex flex-col items-center justify-around rounded border border-gray-300 bg-zinc-50 p-4 text-center text-celeste shadow-lg sm:p-8">
        <LogoIcon className="mb-5 size-8 fill-celeste sm:size-14" />
        <h1 className="text-6xl font-extrabold sm:text-9xl ">404</h1>
        <span className="text-2xl font-semibold uppercase sm:text-4xl">
          Página não encontrada.
        </span>

        <p className="my-5 text-sm sm:max-w-96 sm:text-base">
          A página que você procura foi <br />
          removida, renomeada or pode nunca ter existido.
        </p>

        <Link
          href={siteRoutes.public.landingPage}
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outlineSecondary' }),
            'uppercase',
          )}
        >
          Ir para o aplicativo
        </Link>
      </div>
    </div>
  )
}
