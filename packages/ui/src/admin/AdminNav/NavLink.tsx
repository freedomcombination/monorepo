import { FC } from 'react'

import { Button } from '@chakra-ui/react'

import { NavLinkProps } from './types'
import { ButtonLink } from '../../components'

export const NavLink: FC<NavLinkProps> = ({ href, children, ...rest }) =>
  href ? (
    <ButtonLink href={href} variant={'unstyled'} w={'full'} {...rest}>
      {children}
    </ButtonLink>
  ) : (
    <Button variant={'unstyled'} w={'full'} {...rest}>
      {children}
    </Button>
  )
