import { Section } from '@/app/(public)/_components/section'
import { Suspense } from 'react'
import { VolunteerListSkeleton } from './_components/volunteer-list-skeleton'
import { VolunteerListWrapper } from './_components/volunteer-list-wrapper'

export default function VoluntariosPage() {
  return (
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] items-start justify-start gap-7 pt-10 lg:min-h-[calc(100vh-6.75rem)] 2xl:gap-5">
      <Suspense fallback={<VolunteerListSkeleton />}>
        <VolunteerListWrapper />
      </Suspense>
    </Section>
  )
}
