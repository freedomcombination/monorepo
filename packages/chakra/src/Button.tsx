import { forwardRef } from 'react'

import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from '@chakra-ui/react'

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      loading,
      disabled,
      loadingText,
      children,
      leftIcon,
      rightIcon,
      ...rest
    } = props

    return (
      <ChakraButton disabled={loading || disabled} ref={ref} {...rest}>
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner boxSize="1em" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner boxSize="1em" color="inherit" />
            {loadingText}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </ChakraButton>
    )
  },
)
