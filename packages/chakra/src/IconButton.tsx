import { forwardRef } from 'react'

import {
  AbsoluteCenter,
  IconButton as ChakraIconButton,
  Span,
  Spinner,
} from '@chakra-ui/react'
import type { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react'

interface IconButtonLoadingProps {
  loading?: boolean
  icon: React.ReactNode
  isRound?: boolean
}

export interface IconButtonProps
  extends ChakraIconButtonProps,
    IconButtonLoadingProps {}

export const IconButton = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, 'children'>
>(function Button(props, ref) {
  const { loading, disabled, icon, isRound, rounded, ...rest } = props

  const trulyDisabled = loading || disabled
  const showSpinner = loading

  return (
    <ChakraIconButton
      disabled={trulyDisabled}
      ref={ref}
      {...rest}
      rounded={isRound ? 'full' : rounded}
    >
      {showSpinner && <ButtonSpinner />}
      {loading ? <Span opacity={0}>{icon}</Span> : icon}
    </ChakraIconButton>
  )
})

const ButtonSpinner = () => (
  <AbsoluteCenter display="inline-flex">
    <Spinner boxSize="1em" color="currentColor" />
  </AbsoluteCenter>
)
