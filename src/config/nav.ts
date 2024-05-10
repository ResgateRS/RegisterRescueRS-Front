import { siteRoutes } from './site'

export type NavItem = {
  title: string
  href: string
  type: 'link' | 'button'
}

export const navConfig = [
  {
    title: 'Doações',
    href: siteRoutes.public.donations,
    type: 'link',
  },
  {
    title: 'Voluntários',
    href: siteRoutes.public.volunteers,
    type: 'link',
  },
  {
    title: 'Acessar',
    href: siteRoutes.public.login,
    type: 'button',
  },
] satisfies NavItem[]
