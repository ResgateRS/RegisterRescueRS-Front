import { CollaborationFigure } from '@/components/figures/collaboration'
import { SearchAndListFigure } from '@/components/figures/search-and-list'
import { GithubIcon } from '@/components/icons/github'
import { HeartIcon } from '@/components/icons/heart'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { donationInfos } from '@/config/how-to-donate'
import { mainContributors, organizationHref, siteRoutes } from '@/config/site'
import { cn } from '@/lib/utils'
import { MailIcon } from 'lucide-react'
import Link from 'next/link'
import { Section } from '../../../components/core/section'
import { SectionInfo } from '../../../components/core/section-info'
import { DonationList } from './_components/donations/donation-list'
import { FindOutMoreButton } from './_components/find-out-more-button'
import { HowToDonateButton } from './_components/how-to-donate-button'
import { VolunteerList } from './_components/volunteers/volunteer-list'

export default function LandingPage() {
  return (
    <>
      <Section
        id="inicio"
        className="min-h-[calc(100vh-12.75rem)] flex-row justify-between bg-celeste text-zinc-50 lg:min-h-[calc(100vh-6.75rem)] xl:gap-32"
      >
        <div className="flex max-w-none flex-col items-center gap-5 lg:max-w-md lg:items-start xl:max-w-xl">
          <h1 className="text-center text-5xl font-bold leading-[1.15] lg:text-start lg:text-4xl xl:text-5xl">
            Apoie abrigos e pessoas resgatadas!
          </h1>
          <p className="text-center text-xl font-light lg:text-start lg:text-lg xl:text-xl">
            Faça a diferença na vida das pessoas e ajude abrigos a fornecer
            cuidados essenciais. Saiba o que os abrigos estão precisando e como
            doar da forma correta!
          </p>

          <FindOutMoreButton />
        </div>

        <SearchAndListFigure className="hidden size-[500px] lg:block 2xl:size-[600px]" />
      </Section>

      <Section id="doacoes">
        <SectionInfo
          title="Doações"
          description="Sua doação não só fornece apoio imediato, mas também ajuda a
            construir um futuro mais seguro e promissor para aqueles que
            precisam. Junte-se a nós nesse ato de solidariedade e faça parte da
            mudança positiva em nossa comunidade."
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:gap-8">
          <DonationList />
        </div>

        <Link
          href={siteRoutes.public.donations}
          className={cn(buttonVariants({ size: 'link', variant: 'link' }))}
        >
          Ver todos
        </Link>

        <HowToDonateButton />
      </Section>

      <Section id="como-doar">
        <SectionInfo
          title="Saiba como e o quê doar"
          description="Sua doação não só fornece apoio imediato, mas também ajuda a construir um futuro mais seguro e promissor para aqueles que precisam. Junte-se a nós nesse ato de solidariedade e faça parte da mudança positiva em nossa comunidade."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {donationInfos.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex w-full flex-col gap-2.5 rounded-2xl px-5 py-3 shadow-lg xl:w-[350px] xl:gap-5 xl:px-10 xl:py-6 2xl:py-8"
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
          <CollaborationFigure className="hidden size-[400px] lg:block 2xl:size-[500px]" />
          <div className="flex w-full flex-col gap-3 lg:gap-6">
            <VolunteerList />
            <Link
              href={siteRoutes.public.volunteers}
              className={cn(
                buttonVariants({ size: 'link', variant: 'link' }),
                'lg:self-start',
              )}
            >
              Ver todos
            </Link>
          </div>
        </div>
      </Section>

      <footer className="flex flex-col items-center justify-center gap-4 bg-celeste px-4 py-5 text-zinc-50 lg:px-20 xl:flex-row xl:items-end xl:justify-between xl:gap-0 xl:px-24 2xl:px-44">
        <div className="order-2 flex flex-col items-center gap-1 xl:order-none xl:items-start">
          <span className="font-bold">Criado por:</span>
          <div className="flex flex-wrap justify-start gap-x-6 gap-y-2 ">
            {mainContributors.map((contributor) => (
              <Link
                key={contributor.user}
                href={contributor.href}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: 'linkSecondary', size: 'link' }),
                  'justify-start',
                )}
              >
                @{contributor.user}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="order-1 block xl:hidden" />

        <div className="order-0 flex w-full flex-col items-center gap-1 xl:items-end">
          <Link
            href={'mailto:contato@resgaters.app.br'}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'linkSecondary', size: 'link' }),
              'underline font-light flex gap-1 mb-1 group',
            )}
          >
            contato@resgaters.app.br
            <MailIcon className="size-4 transition-opacity group-hover:opacity-80" />
          </Link>

          <div className="flex items-center gap-1">
            <span className="font-bold">Este é um projeto open-source</span>
            <HeartIcon className="size-4" />
          </div>
          <Link
            href={organizationHref}
            target="_blank"
            className={cn(
              buttonVariants({ variant: 'linkSecondary', size: 'link' }),
              'justify-end underline flex gap-1 group',
            )}
          >
            <span>Acesse o GitHub</span>
            <GithubIcon className="size-6 transition-opacity group-hover:opacity-80" />
          </Link>
        </div>
      </footer>
    </>
  )
}
