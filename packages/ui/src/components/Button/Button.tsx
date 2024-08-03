import { forwardRef, ReactNode } from 'react'

import {
  AbsoluteCenter,
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Spinner,
} from '@chakra-ui/react'

export type ButtonProps = ChakraButtonProps & {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <ChakraButton ref={ref}>
        {props.isLoading ? (
          <AbsoluteCenter>
            <Spinner />
          </AbsoluteCenter>
        ) : (
          <>
            {props.leftIcon}
            {props.children}
            {props.rightIcon}
          </>
        )}
      </ChakraButton>
    )
  },
)

Button.displayName = 'Button'
