import { listFamilies } from '@/api/list-families'
import { ErrorContainer } from '@/app/(public)/(landing-page)/_components/error-container'
import { familiesListPageSize } from '@/config/families'
import { FamilyList } from './family-list'

type Props = {
  authToken: string
}

export async function FamilyListWrapper({ authToken }: Props) {
  const { data, message, result } = await listFamilies({
    pageSize: familiesListPageSize,
    authToken,
  })

  if (result === 1) {
    return <FamilyList authToken={authToken} initialData={data} />
  }

  return <ErrorContainer message={message} />
}
