import { CollaborationFigure } from '@/components/figures/collaboration'
import { SearchAndListFigure } from '@/components/figures/search-and-list'
import { buttonVariants } from '@/components/ui/button'
import { donationInfos } from '@/config/how-to-donate'
import { siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Suspense } from 'react'
import { DonationListSkeleton } from './_components/donations/donastion-list-skeleton'
import { DonationList } from './_components/donations/donation-list'
import { FindOutMoreButton } from './_components/find-out-more-button'
import { HowToDonateButton } from './_components/how-to-donate-button'
import { Section } from './_components/section'
import { SectionInfo } from './_components/section-info'
import { VolunteerList } from './_components/volunteers/volunteer-list'
import { VolunteerListSkeleton } from './_components/volunteers/volunteer-list-skeleton'

export default function LandingPage() {
  return (
    <>
      <Section
        id="inicio"
        className="flex-row justify-between gap-32 bg-celeste text-zinc-50 2xl:gap-32"
      >
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

        <SearchAndListFigure className="size-[500px] 2xl:size-[600px]" />
      </Section>

      <Section id="doacoes">
        <SectionInfo
          title="Doações"
          description="Sua doação não só fornece apoio imediato, mas também ajuda a
            construir um futuro mais seguro e promissor para aqueles que
            precisam. Junte-se a nós nesse ato de solidariedade e faça parte da
            mudança positiva em nossa comunidade."
        />

        <div className="grid grid-cols-2 gap-4 2xl:gap-8">
          <Suspense fallback={<DonationListSkeleton />}>
            <DonationList />
          </Suspense>
        </div>

        <Link
          href={siteRoutes.public.donations}
          className={cn(buttonVariants({ size: 'link', variant: 'link' }))}
        >
          Ver todas
        </Link>

        <HowToDonateButton />
      </Section>

      <Section id="como-doar">
        <SectionInfo
          title="Saiba como e o quê doar"
          description="Sua doação não só fornece apoio imediato, mas também ajuda a construir um futuro mais seguro e promissor para aqueles que precisam. Junte-se a nós nesse ato de solidariedade e faça parte da mudança positiva em nossa comunidade."
        />

        <div className="grid grid-cols-3 gap-4">
          {donationInfos.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex w-[350px] flex-col gap-5 rounded-2xl px-10 py-6 shadow-lg 2xl:py-8"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-celeste/45 2xl:size-12">
                <Icon className="size-4 2xl:size-5" />
              </div>

              <h2 className="text-xl 2xl:text-2xl">{title}</h2>
              <p className="text-sm 2xl:text-base">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="abrigos-e-voluntarios" className="2xl:gap-2">
        <SectionInfo
          title="Abrigos e Voluntários"
          description="Seja voluntário em abrigos no RS, oferecendo apoio direto e cuidado às pessoas resgatadas. Faça parte dessa rede de solidariedade e impacte positivamente sua comunidade."
        />

        <div className="flex items-center gap-6">
          <CollaborationFigure className="size-[400px] 2xl:size-[500px]" />
          <div className="flex flex-col gap-6">
            <Suspense fallback={<VolunteerListSkeleton />}>
              <VolunteerList />
            </Suspense>
          </div>
        </div>
      </Section>
    </>
  )
}
