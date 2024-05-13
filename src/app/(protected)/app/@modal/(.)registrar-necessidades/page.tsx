import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { jwtUserDataSchema } from '@/schemas/jwt-user-data-schema'
import { JwtPayload } from '@/types/api'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { RegisterNeedsDialog } from '../../registrar-necessidades/_components/register-needs-dialog'

export default async function RegistrarNecessidadesModalPage() {
  const token = cookies().get(cookiesNames.session)?.value
  if (!token) {
    redirect(siteRoutes.public.landingPage)
  }
  const decodedToken = jwtDecode<JwtPayload>(token)

  const userData = jwtUserDataSchema.safeParse(
    JSON.parse(decodedToken.userData),
  )

  if (!userData.success) {
    redirect(siteRoutes.public.landingPage)
  }

  return (
    <RegisterNeedsDialog
      shelterId={userData.data.shelterId}
      authToken={token}
    />
  )
}
