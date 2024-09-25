import { FC } from 'react'

import { Link } from '@chakra-ui/next-js'
import { useRouter } from 'next/router'

import { FooterNavItemProps } from './types'

export const FooterNavItem: FC<FooterNavItemProps> = ({ item }) => {
  const { locale } = useRouter()
  const isExternal = item.link?.startsWith('http')

  return (
    <Link
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
      key={item.link}
      href={item.link as string}
    >
      {item[locale || 'en']}
    </Link>
  )
}
