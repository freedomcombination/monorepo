import { FC } from 'react'

import { Button } from '@chakra-ui/react'
import { omit } from 'lodash'

import { NavLinkProps } from './types'
import { ButtonLink } from '../ButtonLink'

export const NavLink: FC<NavLinkProps> = ({ href, children, ...rest }) =>
  href ? (
    <ButtonLink
      href={href as string}
      w={'full'}
      variant={'plain'}
      {...omit(rest, 'onClick')}
    >
      {children}
    </ButtonLink>
  ) : (
    <Button variant={'plain'} w={'full'} {...rest}>
      {children}
    </Button>
  )
