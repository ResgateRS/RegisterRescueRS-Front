import SearchAndList from '@/assets/search-and-list.svg'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { DonationListSkeleton } from './_components/donations/donastion-list-skeleton'
import { DonationList } from './_components/donations/donation-list'
import { FindOutMoreButton } from './_components/find-out-more-button'
import { HowToDonateButton } from './_components/how-to-donate-button'
import { Section } from './_components/section'

export default function LandingPage() {
  return (
    <>
      <Section id="inicio" className="justify-between bg-celeste text-zinc-50">
        <div className="flex max-w-xl flex-col gap-5">
          <h1 className="text-5xl font-bold">
            Apoie abrigos e pessoas resgatadas!
          </h1>
          <p className="text-xl font-light">
            Faça a diferença na vida das pessoas e ajude abrigos a fornecer
            cuidados essenciais. Saiba o que os abrigos estão precisando e como
            doar da forma correta!
          </p>

          <FindOutMoreButton />
        </div>

        <Image
          src={SearchAndList}
          className="size-[500px] 2xl:size-[600px]"
          alt="Desenho colorido de uma mulher com uma lupa na mão e uma lista de pessoas à sua frente."
        />
      </Section>

      <Section id="doacoes" className="flex-col gap-3 2xl:gap-10">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-5xl font-bold leading-10 text-celeste 2xl:leading-[56px]">
            Doações
          </h1>
          <Separator className="h-[2px] w-14 bg-zinc-950" />
          <p className="text-balance text-center">
            Sua doação não só fornece apoio imediato, mas também ajuda a
            construir um futuro mais seguro e promissor para aqueles que
            precisam. Junte-se a nós nesse ato de solidariedade e faça parte da
            mudança positiva em nossa comunidade.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 2xl:gap-8">
          <Suspense fallback={<DonationListSkeleton />}>
            <DonationList />
          </Suspense>
        </div>

        <Link
          href={siteRoutes.public.donations}
          className={cn(
            buttonVariants({ size: 'link', variant: 'link' }),
            'hover:text-celeste/80',
          )}
        >
          Ver todas
        </Link>

        <HowToDonateButton />
      </Section>
    </>
  )
}
