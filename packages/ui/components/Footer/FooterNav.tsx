import { FC } from 'react'

import { Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { FooterNavItem } from './FooterNavItem'
import { FooterNavProps } from './types'

export const FooterNav: FC<FooterNavProps> = ({ menu }) => {
  const { locale } = useRouter()

  return (
    <>
      {menu?.map((item, i) => {
        return (
          <Stack
            key={i}
            align="center"
            marginX={4}
            fontSize="lg"
            color={'primary.50'}
            py={4}
          >
            <Text
              fontWeight={600}
              fontSize={'lg'}
              mb={2}
              textTransform="uppercase"
            >
              {item[locale || 'en']}
            </Text>
            {item.children?.map((item, j) => {
              return <FooterNavItem key={j} item={item} />
            })}
          </Stack>
        )
      })}
    </>
  )
}
