import { siteRoutes } from './site'

export type NavItem = {
  title: string
  href: string
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
      },
    ],
  },
  protected: {
    link: [
      {
        title: 'Cadastrar necessidades',
        href: siteRoutes.protected.registerNeeds,
      },
      {
        title: 'Cadastrar família',
        href: siteRoutes.protected.registerNeeds,
      },
    ],
    button: [],
  },
} satisfies NavConfig
