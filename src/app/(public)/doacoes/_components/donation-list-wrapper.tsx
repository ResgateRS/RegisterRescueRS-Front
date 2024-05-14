import { listDonations } from '@/api/list-donations'
import { ErrorContainer } from '@/app/(public)/(landing-page)/_components/error-container'
import { donationsListPageSize } from '@/config/donations'
import { DonationList } from './donation-list'

export async function DonationListWrapper() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
  const { data, message, result } = await listDonations({
    pageSize: donationsListPageSize,
  })

  if (result === 1) {
    return <DonationList initialData={data} />
  }

  return <ErrorContainer message={message} />
}
