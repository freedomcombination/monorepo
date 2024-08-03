import { FC } from 'react'

import { ButtonLink, ButtonLinkProps } from '../ButtonLink'

export const NavLink: FC<ButtonLinkProps> = ({ href, children, ...rest }) => (
  <ButtonLink href={href as string} variant={'plain'} w={'full'} {...rest}>
    {children}
  </ButtonLink>
)
