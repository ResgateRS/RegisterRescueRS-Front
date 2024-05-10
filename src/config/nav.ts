import { siteRoutes } from './site'

export type NavItem = {
  title: string
  href: string
}

export const navConfig = {
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
} satisfies {
  link: NavItem[]
  button: NavItem[]
}
