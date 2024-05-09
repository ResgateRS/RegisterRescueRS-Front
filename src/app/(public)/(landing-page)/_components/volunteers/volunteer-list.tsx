import { listVolunteers } from '@/api/list-volunteers'
import { ErrorContainer } from '../error-container'
import { VolunteerItem } from './volunteer-item'

export async function VolunteerList() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })
  const { data, message, result } = await listVolunteers({
    authToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6IntcIlNoZWx0ZXJJZFwiOlwiNTIzMzU5MWYtNTQwYi00ZmM5LTg0YjktOGU0NWQ3MjlhNWY2XCIsXCJBZG1cIjpmYWxzZX0iLCJuYmYiOjE3MTUyNTgzOTcsImV4cCI6MTcxNTI2MTk5NywiaWF0IjoxNzE1MjU4Mzk3fQ.7yEywBaJFDBzjYF4xvepDND9E6oag6kPYaSNC7Lh5Ys',
    pageSize: 3,
  })

  if (result === 1) {
    return (
      <>
        {data.map((volunteer) => (
          <VolunteerItem key={volunteer.shelterId} volunteer={volunteer} />
        ))}
      </>
    )
  }

  return <ErrorContainer message={message} />
}
