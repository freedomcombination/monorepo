import { forwardRef } from 'react'

import { LuX } from 'react-icons/lu'

import type { ButtonProps as ChakraCloseButtonProps } from './Button'
import { IconButton as ChakraIconButton } from './IconButton'

export type CloseButtonProps = ChakraCloseButtonProps

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <ChakraIconButton
        variant="ghost"
        aria-label="Close"
        ref={ref}
        icon={<LuX />}
        {...props}
      />
    )
  },
)
