import { Section } from '@/app/(public)/_components/section'
import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { jwtUserDataSchema } from '@/schemas/jwt-user-data-schema'
import { JwtPayload } from '@/types/api'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { FamilyListSkeleton } from './_components/families-list-skeleton'
import { FamilyListWrapper } from './_components/family-list-wrapper'

export default function CadastroFamiliaPage() {
  const token = cookies().get(cookiesNames.session)?.value
  if (!token) {
    redirect(siteRoutes.public.landingPage)
  }
  const decodedToken = jwtDecode<JwtPayload>(token)
  const userData = jwtUserDataSchema.safeParse(
    JSON.parse(decodedToken.userData),
  )

  return (
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] items-start justify-start pt-10 lg:min-h-[calc(100vh-6.75rem)] 2xl:gap-3">
      <h1 className="text-2xl">
        Seja bem vindo,{' '}
        <span className="font-medium">
          {userData.success ? userData.data.shelterName : 'Abrigo'}
        </span>
        !
      </h1>

      <Suspense fallback={<FamilyListSkeleton />}>
        <FamilyListWrapper authToken={token} />
      </Suspense>
    </Section>
  )
}
