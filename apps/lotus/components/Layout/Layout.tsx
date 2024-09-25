import { FC, PropsWithChildren } from 'react'

import { Center } from '@chakra-ui/react'
import { NextSeo, NextSeoProps } from 'next-seo'

import { UserFeedback } from '@fc/ui/components/UserFeedback'

interface LayoutProps extends PropsWithChildren {
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({ children, seo }) => {
  return (
    <>
      <NextSeo {...seo} />
      <Center minH={'100vh'} bg={'black'} color={'whiteAlpha.700'}>
        {children}
      </Center>
      <UserFeedback />
    </>
  )
}
