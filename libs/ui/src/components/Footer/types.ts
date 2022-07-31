import { HeaderMenu, HeaderNavItemProps } from '../Header/types'
import { SocialItem } from '../SocialButtons'

export type FooterProps = {
  menu: HeaderMenu
  about: string
  logo: string
  socialItems: SocialItem[]
}

export type FooterNavProps = Pick<FooterProps, 'menu'>

export type FooterNavItemProps = HeaderNavItemProps
