import { listVolunteers } from '@/api/list-volunteers'
import { ErrorContainer } from '../error-container'
import { VolunteerItem } from './volunteer-item'

export async function VolunteerList() {
  const { data, message, result } = await listVolunteers({
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
