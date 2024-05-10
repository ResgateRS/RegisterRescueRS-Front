'use client'

import { WhatsAppIcon } from '@/components/icons/whatsapp'
import { buttonVariants } from '@/components/ui/button'
import { whatsappHref } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Section } from '../_components/section'
import { LoginForm } from './_components/form'

export default function LoginPage() {
  return (
    <Section className="min-h-0 flex-1 flex-row justify-between gap-32 bg-celeste text-zinc-50 2xl:gap-32">
      <div className="flex max-w-xl flex-col gap-5">
        <h1 className="text-5xl font-bold">Solicite seu cadastro conosco!</h1>
        <p className="text-xl font-light">
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
        >
          <WhatsAppIcon className="size-5 transition-colors group-hover:fill-celeste" />
          solicitar cadastro
        </Link>
      </div>

      <LoginForm />
    </Section>
  )
}
