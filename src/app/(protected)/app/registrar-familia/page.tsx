import { Section } from '@/components/core/section'
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
import { redirect } from 'next/navigation'
import { RegisterFamilyForm } from './_components/register-family-form'

export default async function RegistrarFamiliaPage() {
  const token = cookies().get(cookiesNames.session)?.value
  if (!token) {
    redirect(siteRoutes.public.landingPage)
  }

  return (
    <Section className="mb-0 min-h-[calc(100vh-12.75rem)] items-center justify-center gap-7 pt-10 lg:min-h-[calc(100vh-6.75rem)] 2xl:gap-5">
      <Card className="w-full lg:w-3/4 xl:w-1/2">
        <CardHeader>
          <CardTitle>Registrar família</CardTitle>
          <CardDescription>
            Preencha o formulário para adicionar uma família ao abrigo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterFamilyForm authToken={token} />
        </CardContent>
      </Card>
    </Section>
  )
}
