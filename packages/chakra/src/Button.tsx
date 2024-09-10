import { forwardRef } from 'react'

import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
} from '@chakra-ui/react'
import type { ButtonProps as ChakraButtonProps } from '@chakra-ui/react'

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
      colorPalette = 'green',
      ...rest
    } = props

    const trulyDisabled = loading || disabled
    const showSpinner = loading && !loadingText

    return (
      <ChakraButton
        disabled={trulyDisabled}
        ref={ref}
        {...rest}
        colorPalette={colorPalette}
      >
        {showSpinner && <ButtonSpinner />}
        {loading ? (
          loadingText || (
            <Span opacity={0}>
              {leftIcon}
              {children}
              {rightIcon}
            </Span>
          )
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

const ButtonSpinner = () => (
  <AbsoluteCenter display="inline-flex">
    <Spinner boxSize="1em" color="currentColor" />
  </AbsoluteCenter>
)
