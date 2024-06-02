import { FC } from 'react'

import { Link, LinkProps } from '@chakra-ui/next-js'
import { Button, ButtonProps } from '@chakra-ui/react'

type ButtonLinkProps = ButtonProps & LinkProps

export const ButtonLink: FC<ButtonLinkProps> = props => {
  return <Button as={Link} {...props} />
}
