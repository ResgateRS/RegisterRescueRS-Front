import { Section } from '@/components/core/section'
import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { jwtUserDataSchema } from '@/schemas/jwt-user-data-schema'
import { JwtPayload } from '@/types/api'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { FamilyList } from './_components/family-list'

export default function FamiliasPage() {
  const token = cookies().get(cookiesNames.session)?.value
  if (!token) {
    redirect(siteRoutes.public.landingPage)
  }
  const decodedToken = jwtDecode<JwtPayload>(token)
  const userData = jwtUserDataSchema.safeParse(
    JSON.parse(decodedToken.userData),
  )

  return (
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] items-start justify-start gap-0 pt-10 lg:min-h-[calc(100vh-6.75rem)] xl:gap-7 2xl:gap-5">
      <h1 className="w-full text-center text-lg lg:text-start lg:text-2xl">
        Seja bem vindo,{' '}
        <span className="font-medium">
          {userData.success ? userData.data.shelterName : 'Abrigo'}
        </span>
        !
      </h1>

      <FamilyList authToken={token} />
    </Section>
  )
}
