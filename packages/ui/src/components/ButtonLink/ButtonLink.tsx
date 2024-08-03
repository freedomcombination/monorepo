import { FC } from 'react'

import { Link, LinkProps } from '@chakra-ui/next-js'
import { ButtonProps } from '@chakra-ui/react'

import { Button } from '../Button'

export type ButtonLinkProps = ButtonProps & LinkProps

export const ButtonLink: FC<ButtonLinkProps> = props => {
  return <Button {...(props.href ? { as: Link } : {})} {...props} />
}
