import { listDonations } from '@/api/list-donations'
import { ErrorContainer } from '../error-container'
import { DonationItem } from './donation-item'

export async function DonationList() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
  const { data, message, result } = await listDonations({
    authToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6IntcIlNoZWx0ZXJJZFwiOlwiNTIzMzU5MWYtNTQwYi00ZmM5LTg0YjktOGU0NWQ3MjlhNWY2XCIsXCJBZG1cIjpmYWxzZX0iLCJuYmYiOjE3MTUyNTgzOTcsImV4cCI6MTcxNTI2MTk5NywiaWF0IjoxNzE1MjU4Mzk3fQ.7yEywBaJFDBzjYF4xvepDND9E6oag6kPYaSNC7Lh5Ys',
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
