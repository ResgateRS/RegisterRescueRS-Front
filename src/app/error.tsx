'use client'

import { LogoIcon } from '@/components/icons/logo'
import { buttonVariants } from '@/components/ui/button'
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  error: Error & { digest?: string }
}

export default function ErrorBoundary({ error }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-500">
      <div className="relative flex flex-col items-center justify-around rounded border border-gray-300 bg-zinc-50 p-4 text-center text-red-500 shadow-lg sm:p-8">
        <LogoIcon className="mb-5 size-8 fill-red-500 sm:size-14" />
        <span className="text-2xl font-semibold uppercase sm:text-4xl">
          Algo deu errado!
        </span>

        <p className="my-5 text-sm sm:max-w-96 sm:text-base">
          {error.message.length > 0
            ? error.message
            : 'Um problema foi identificado no sistema. Entre em contato com algum administrador.'}
        </p>

        <Link
          href={siteRoutes.public.landingPage}
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outlineSecondary' }),
            'uppercase border-red-500 text-red-500 hover:bg-red-500',
          )}
        >
          Ir para o aplicativo
        </Link>
      </div>
    </div>
  )
}
