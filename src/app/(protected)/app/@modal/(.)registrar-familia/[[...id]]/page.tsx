import {
  ListFamilyDetailsResponse,
  listFamilyDetails,
} from '@/api/list-family-details'
import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { validate as validateUuid } from 'uuid'
import { RegisterFamilyDialog } from '../../../registrar-familia/[[...id]]/_components/register-family-dialog'

type Props = {
  params: {
    id?: string[]
  }
}

export default async function RegistrarFamiliaModalPage({
  params: { id },
}: Props) {
  if (id && id.length > 1) {
    notFound()
  }

  const token = cookies().get(cookiesNames.session)?.value
  if (!token) {
    redirect(siteRoutes.public.landingPage)
  }

  let family: ListFamilyDetailsResponse | undefined
  const familyId = id && id[0]
  if (familyId && validateUuid(familyId)) {
    const { result, data } = await listFamilyDetails({
      familyId,
      authToken: token,
    })

    if (result === 1) {
      family = data
    } else {
      notFound()
    }
  }

  return <RegisterFamilyDialog authToken={token} family={family} />
}
