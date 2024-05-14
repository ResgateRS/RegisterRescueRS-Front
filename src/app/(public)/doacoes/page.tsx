import { Section } from '@/app/(public)/_components/section'
import { Suspense } from 'react'
import { DonationListSkeleton } from './_components/donation-list-skeleton'
import { DonationListWrapper } from './_components/donation-list-wrapper'

export default function DoacoesPage() {
  return (
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] items-start justify-start gap-7 pt-10 lg:min-h-[calc(100vh-6.75rem)] 2xl:gap-5">
      <h1 className="w-full text-center text-lg lg:text-start lg:text-2xl">
        Todos os abrigos aceitando doações
      </h1>

      <Suspense fallback={<DonationListSkeleton />}>
        <DonationListWrapper />
      </Suspense>
    </Section>
  )
}
