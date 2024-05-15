import { listFamilyDetails } from '@/api/list-family-details'
import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { validate as validateUuid } from 'uuid'
import { RegisterFamilyDialog } from '../../../registrar-familia/_components/register-family-dialog'

type Props = {
  params: {
    id: string
  }
}

export default async function RegistrarFamiliaModalPage({
  params: { id: familyId },
}: Props) {
  const token = cookies().get(cookiesNames.session)?.value
  if (!token) {
    redirect(siteRoutes.public.landingPage)
  }

  if (!validateUuid(familyId)) {
    notFound()
  }

  const { result, data: family } = await listFamilyDetails({
    familyId,
    authToken: token,
  })

  if (result !== 1) {
    notFound()
  }

  return <RegisterFamilyDialog authToken={token} family={family} />
}
