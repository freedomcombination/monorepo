import { FC } from 'react'

import { Button, ButtonProps } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'

type ButtonLinkProps = ButtonProps &
  LinkProps & {
    isExternal?: boolean
    target?: string
  }

export const ButtonLink: FC<ButtonLinkProps> = ({
  isExternal,
  target: initialTarget,
  rel: initialRel,
  color = 'initial',
  ...props
}) => {
  const target = isExternal ? '_blank' : initialTarget
  const rel = isExternal ? 'noopener noreferrer' : initialRel

  return (
    <Button
      {...(props.href ? { as: Link, target, rel } : {})}
      color={color}
      {...props}
    />
  )
}
