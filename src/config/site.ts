// General config

import { env } from '@/env'
import { Metadata, Viewport } from 'next'

export const siteConfig = {
  title: 'Abrigos RS',
  description:
    'Sistema de Ajuda e Resgate no Rio Grande do Sul | Divulgue pedidos de doações, encontre voluntários (médicos e veterinários), e receba avisos importantes sobre acolhimento. Conectamos quem precisa de ajuda com quem pode oferecer apoio. Juntos, fazemos a diferença!',
} satisfies Record<string, string>

export type RouteVisibility = 'public' | 'protected'

export type Contributor = {
  user: string
  href: string
}

export const mainContributors = [
  {
    user: 'caieradev',
    href: 'https://github.com/caieradev',
  },
  {
    user: 'lorenzoa7',
    href: 'https://github.com/lorenzoa7',
  },
  {
    user: 'arthuroli29',
    href: 'https://github.com/arthuroli29',
  },
  {
    user: 'GuiAguirres',
    href: 'https://github.com/GuiAguirres',
  },
  {
    user: 'luilencina',
    href: 'https://github.com/luilencina',
  },
  {
    user: 'gbombassaro',
    href: 'https://github.com/gbombassaro',
  },
  {
    user: 'caiocesarbrito',
    href: 'https://github.com/caiocesarbrito',
  },
] satisfies Contributor[]

export const siteMetadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords:
    'rio grande do sul, desastre, abrigo, tragedia, resgate, resgaters, abrigors, abrigosrs, abrigos, rs, ajuda, aplicativo, site',
  authors: [
    { name: 'ResgateRS', url: 'https://www.instagram.com/resgaters.app.br' },
    ...mainContributors.map((contributor) => ({
      name: contributor.user,
      url: contributor.href,
    })),
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://abrigosrs.app.br',
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.title,
  },
  twitter: {
    card: 'summary',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  applicationName: siteConfig.title,
  metadataBase: new URL(env.NEXT_PUBLIC_NEXT_API_URL),
  formatDetection: {
    telephone: false,
  },
}

export const siteViewport: Viewport = {
  themeColor: '#4682B4',
}

export const organizationHref = 'https://github.com/ResgateRS'

export const whatsappHref =
  'https://wa.me/5551991732630?text=Olá!%20Gostaria%20de%20solicitar%20um%20cadastro%20para%20o%20Abrigos%20RS!'

// Site routes

export const prefixSiteRoutes = {
  protected: '/app',
  public: '',
} as const satisfies Record<RouteVisibility, string>

export const siteRoutes = {
  public: {
    landingPage: `${prefixSiteRoutes.public}/`,
    login: `${prefixSiteRoutes.public}/login`,
    signup: `${prefixSiteRoutes.public}/cadastro`,
    donations: `${prefixSiteRoutes.public}/doacoes`,
    volunteers: `${prefixSiteRoutes.public}/voluntarios`,
  },
  protected: {
    families: `${prefixSiteRoutes.protected}/familias`,
    registerFamily: `${prefixSiteRoutes.protected}/registrar-familia`,
    registerNeeds: `${prefixSiteRoutes.protected}/registrar-necessidades`,
    verifyShelter: `${prefixSiteRoutes.protected}/verificar-abrigo`,
  },
} as const satisfies Record<RouteVisibility, Record<string, string>>
