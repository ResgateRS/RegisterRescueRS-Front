import { listDonations } from '@/api/list-donations'
import { ErrorContainer } from '@/app/(public)/(landing-page)/_components/error-container'
import { donationsListPageSize } from '@/config/donations'
import { DonationList } from './donation-list'

export async function DonationListWrapper() {
  const { data, message, result } = await listDonations({
    pageSize: donationsListPageSize,
  })

  if (result === 1) {
    return <DonationList initialData={data} />
  }

  return <ErrorContainer message={message} />
}
