import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { RegisterFamilyDialog } from '../../registrar-familia/_components/register-family-dialog'

export default async function RegistrarFamiliaModalPage() {
  const token = cookies().get(cookiesNames.session)?.value
  if (!token) {
    redirect(siteRoutes.public.landingPage)
  }

  return <RegisterFamilyDialog authToken={token} />
}
