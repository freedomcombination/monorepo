import { FC, ReactNode } from 'react'

import {
  AbsoluteCenter,
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Spinner,
} from '@chakra-ui/react'

type IconButtonProps = ChakraIconButtonProps & {
  icon: ReactNode
  isLoading?: boolean
}

export const IconButton: FC<IconButtonProps> = props => {
  return (
    <ChakraIconButton>
      {props.isLoading ? (
        <AbsoluteCenter>
          <Spinner />
        </AbsoluteCenter>
      ) : (
        <>
          {props.icon}
          {props.children}
        </>
      )}
    </ChakraIconButton>
  )
}
