import { FC, PropsWithChildren } from 'react'

import { Heading } from '@chakra-ui/react'

export const PageTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Heading as="h1" textAlign="center" fontWeight={900} fontSize="4xl" my={8}>
      {children}
    </Heading>
  )
}
