import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { VerifyShelterDialog } from '../../verificar-abrigo/_components/verify-shelter-dialog'

export default function VerificarAbrigoModalPage() {
  const token = cookies().get(cookiesNames.session)?.value
  if (!token) {
    redirect(siteRoutes.public.landingPage)
  }

  return <VerifyShelterDialog authToken={token} />
}
