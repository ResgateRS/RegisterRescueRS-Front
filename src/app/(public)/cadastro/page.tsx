'use client'

import { WhatsAppIcon } from '@/components/icons/whatsapp'
import { buttonVariants } from '@/components/ui/button'
import { whatsappHref } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Section } from '../../../components/core/section'
import { CadastroForm } from './_components/form'

export default function CadastroPage() {
  return (
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] justify-center bg-celeste text-zinc-50 lg:min-h-[calc(100vh-6.75rem)] lg:flex-row lg:justify-between 2xl:gap-32">
      <div className="flex max-w-none flex-col items-center gap-5 lg:max-w-md lg:items-start xl:max-w-xl">
        <h1 className="mt-4 text-center text-xl font-bold lg:mt-0 lg:text-start lg:text-4xl 2xl:text-5xl">
          Acesse o aplicativo!
        </h1>
        <p className="hidden text-center text-xl font-light lg:block lg:text-start lg:text-base xl:text-lg 2xl:text-xl">
          Faça a diferença na vida das pessoas e ajude abrigos a fornecer
          cuidados essenciais. Saiba o que os abrigos estão precisando e como
          doar da forma correta!
        </p>

        <Link
          href={whatsappHref}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'text-lg flex gap-2 group',
          )}
          target="_blank"
        >
          <WhatsAppIcon className="size-5 transition-colors group-hover:fill-celeste" />
          entre em contato
        </Link>
      </div>

      <h1 className="mt-2 block text-center text-xl font-bold lg:mt-0 lg:hidden lg:text-start lg:text-5xl">
        Ou cadastre seu abrigo
      </h1>

      <CadastroForm />
    </Section>
  )
}
