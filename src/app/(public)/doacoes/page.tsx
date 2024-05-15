import { Section } from '@/components/core/section'
import { DonationList } from './_components/donation-list'

export default function DoacoesPage() {
  return (
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] items-start justify-start gap-7 pt-10 lg:min-h-[calc(100vh-6.75rem)] 2xl:gap-5">
      <DonationList />
    </Section>
  )
}
