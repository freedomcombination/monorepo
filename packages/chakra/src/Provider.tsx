'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

import { ColorModeProvider } from './ColorMode'

export function Provider(props: React.PropsWithChildren) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>{props.children}</ColorModeProvider>
    </ChakraProvider>
  )
}
