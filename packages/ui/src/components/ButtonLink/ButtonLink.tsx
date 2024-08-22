import { FC } from 'react'

import Link, { LinkProps } from 'next/link'

import { Button, ButtonProps } from '@fc/chakra'

type ButtonLinkProps = Omit<ButtonProps, 'target'> &
  Omit<LinkProps, 'variant'> & { isExternal?: boolean }

export const ButtonLink: FC<ButtonLinkProps> = props => {
  return (
    <Button
      {...(props.href
        ? {
            as: Link,
            ...((props.isExternal && {
              target: '_blank',
              rel: 'noopener noreferrer',
            }) ||
              {}),
          }
        : {})}
      {...props}
    />
  )
}
