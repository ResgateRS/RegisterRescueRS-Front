import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { jwtUserDataSchema } from '@/schemas/jwt-user-data-schema'
import { JwtPayload } from '@/types/api'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function WelcomeTitle() {
  const token = cookies().get(cookiesNames.session)?.value
  if (!token) {
    redirect(siteRoutes.public.landingPage)
  }
  const decodedToken = jwtDecode<JwtPayload>(token)
  const userData = jwtUserDataSchema.safeParse(
    JSON.parse(decodedToken.userData),
  )

  return (
    <h1 className="text-2xl">
      Seja bem vindo,{' '}
      <span className="font-medium">
        {userData.success ? userData.data.shelterName : 'Abrigo'}
      </span>
      !
    </h1>
  )
}
