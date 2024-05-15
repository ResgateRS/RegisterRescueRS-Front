import { listFamilyDetails } from '@/api/list-family-details'
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
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { validate as validateUuid } from 'uuid'
import { RegisterFamilyForm } from '../_components/register-family-form'

type Props = {
  params: {
    id: string
  }
}

export default async function RegistrarFamiliaPage({
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

  return (
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] items-center justify-center gap-7 pt-10 lg:min-h-[calc(100vh-6.75rem)] 2xl:gap-5">
      <Card className="w-full lg:w-3/4 xl:w-1/2">
        <CardHeader>
          <CardTitle>Informações da família</CardTitle>
          <CardDescription>
            Você pode visualizar ou editar as informações desta família.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterFamilyForm authToken={token} family={family} />
        </CardContent>
      </Card>
    </Section>
  )
}
