import { Section } from '@/app/(public)/_components/section'
import { VolunteerList } from './_components/volunteer-list'

export default function VoluntariosPage() {
  return (
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] items-start justify-start gap-7 pt-10 lg:min-h-[calc(100vh-6.75rem)] 2xl:gap-5">
      <VolunteerList />
    </Section>
  )
}
