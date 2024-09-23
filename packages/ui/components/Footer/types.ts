import { HeaderMenu, HeaderNavItemProps } from '../Header/types'
import { SocialItem } from '../SocialButtons'

export type FooterProps = {
  name: string
  menu: HeaderMenu
  about: 'foundation' | 'kunsthalte' | 'trend-rights'
  logo: string
  socialItems: SocialItem[]
}

export type FooterNavProps = Pick<FooterProps, 'menu'>

export type FooterNavItemProps = HeaderNavItemProps
