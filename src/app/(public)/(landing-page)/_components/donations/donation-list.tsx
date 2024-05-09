import { listDonations } from '@/api/list-donations'
import { ErrorContainer } from '../error-container'
import { DonationItem } from './donation-item'

export async function DonationList() {
  const { data, message, result } = await listDonations({
    pageSize: 4,
  })

  if (result === 1) {
    return (
      <>
        {data.map((donation) => (
          <DonationItem key={donation.shelterId} donation={donation} />
        ))}
      </>
    )
  }

  return <ErrorContainer message={message} />
}
