import { FC } from 'react'

import { Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FooterNavItemProps } from './types'

export const FooterNavItem: FC<FooterNavItemProps> = ({ item }) => {
  const { locale } = useRouter()
  const isExternal = item.link?.startsWith('http')

  return (
    <ChakraLink
      asChild
      key={item.link}
      color="primary.100"
      _hover={{
        color: 'primary.50',
      }}
      {...(isExternal
        ? {
            isExternal,
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {
            'data-testid': `link-footer${item.link}`,
          })}
      href={item.link as string}
    >
      <Link
        {...(isExternal && { isExternal, target: '_blank' })}
        href={item.link as string}
      >
        {item[locale || 'en']}
      </Link>
    </ChakraLink>
  )
}
