import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { isValidSession } from './api/is-valid-session'
import { prefixSiteRoutes, siteRoutes } from './config/site'
import { cookiesNames } from './config/storage'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isProtectedRoute = pathname.startsWith(prefixSiteRoutes.protected)
  const token = cookies().get(cookiesNames.session)?.value
  let isAuthenticated = false

  if (token) {
    isAuthenticated = await isValidSession({ token })
  }

  // NOT AUTHENTICATED SCENARIO...

  if (!isAuthenticated) {
    // If it's a protected route, redirect the user to landing page
    if (isProtectedRoute) {
      return NextResponse.redirect(
        new URL(siteRoutes.public.landingPage, request.url),
      )
    }

    // If it isn't a protected route, allow the user to continue
    return NextResponse.next()
  }

  // AUTHENTICATED SCENARIO...

  // If it's a protected route, allow the user to continue
  if (isProtectedRoute) {
    return NextResponse.next()
  }

  // If it isn't a protected route neither, redirect the user to families page
  return NextResponse.redirect(
    new URL(siteRoutes.protected.families, request.url),
  )
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sw.js|icons|manifest.json|swe-worker-development.js).*)',
  ],
}
