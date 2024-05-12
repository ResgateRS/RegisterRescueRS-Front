'use server'

import { siteRoutes } from '@/config/site'
import { cookiesNames } from '@/config/storage'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function handleLogout() {
  cookies().delete(cookiesNames.session)
  redirect(siteRoutes.public.landingPage)
}
