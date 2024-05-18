import { siteRoutes } from './site'

export type NavItem = {
  title: string
  href: string
  isAdmin?: boolean
}

export type NavConfigItems = {
  link: NavItem[]
  button: NavItem[]
  icon?: React.ElementType
}

export type NavConfig = {
  public: NavConfigItems
  protected: NavConfigItems
}

export const navConfig = {
  public: {
    link: [
      {
        title: 'Início',
        href: siteRoutes.public.landingPage,
        isAdmin: false,
      },
      {
        title: 'Doações',
        href: siteRoutes.public.donations,
      },
      {
        title: 'Voluntários',
        href: siteRoutes.public.volunteers,
      },
    ],
    button: [
      {
        title: 'Acessar',
        href: siteRoutes.public.login,
        isAdmin: false,
      },
    ],
  },
  protected: {
    link: [
      {
        title: 'Registrar necessidades',
        href: siteRoutes.protected.registerNeeds,
      },
      {
        title: 'Verificar abrigo',
        href: siteRoutes.protected.verifyShelter,
        isAdmin: true,
      },
    ],
    button: [],
  },
} satisfies NavConfig
