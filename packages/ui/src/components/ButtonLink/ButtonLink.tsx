import { FC } from 'react'

import { Link, LinkProps } from '@chakra-ui/react'

import { Button, ButtonProps } from '@fc/chakra'

type ButtonLinkProps = ButtonProps & LinkProps

export const ButtonLink: FC<ButtonLinkProps> = props => {
  return <Button {...(props.href ? { as: Link } : {})} {...props} />
}
