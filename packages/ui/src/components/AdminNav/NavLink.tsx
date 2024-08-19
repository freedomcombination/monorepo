import { FC } from 'react'

import { Button } from '@chakra-ui/react'

import { NavLinkProps } from './types'
import { ButtonLink } from '../ButtonLink'

export const NavLink: FC<NavLinkProps> = ({ href, children, ...rest }) =>
  href ? (
    <ButtonLink href={href} variant={'plain'} w={'full'} {...rest}>
      {children}
    </ButtonLink>
  ) : (
    <Button variant={'plain'} w={'full'} {...rest}>
      {children}
    </Button>
  )
