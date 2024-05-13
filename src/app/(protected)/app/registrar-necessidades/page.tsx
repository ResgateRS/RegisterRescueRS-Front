import { Section } from '@/app/(public)/_components/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { jwtUserDataSchema } from '@/schemas/jwt-user-data-schema'
import { JwtPayload } from '@/types/api'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { RegisterNeedsForm } from './_components/register-needs-form'

export default function RegistrarNecessidadesPage() {
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
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] items-center justify-center gap-7 pt-10 lg:min-h-[calc(100vh-6.75rem)] 2xl:gap-5">
      <Card className="w-full lg:w-1/2">
        <CardHeader>
          <CardTitle>Registrar necessidades</CardTitle>
          <CardDescription>
            Preencha o formulário para salvar as necessidades do abrigo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterNeedsForm
            shelterId={userData.data.shelterId}
            authToken={token}
          />
        </CardContent>
      </Card>
    </Section>
  )
}
