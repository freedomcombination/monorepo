import { FC } from 'react'

import { Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MenuTypeItemProps } from './types'
import { useScroll } from '../../hooks'

export const ChildMenuItem: FC<MenuTypeItemProps> = ({
  item,
  isDark,
  isMobile,
}) => {
  const { asPath, locale } = useRouter()
  const isScrolled = useScroll()
  const isActive = item.link !== '/' && asPath.includes(item.link as string)
  const isExternal = item.link?.startsWith('http')

  return (
    <ChakraLink
      asChild
      p={2}
      fontWeight={600}
      href={item.link as string}
      data-testid={`link-${isMobile ? 'm' : 'd'}${item.link}`}
      cursor={'pointer'}
      {...(isExternal && {
        isExternal,
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
      color={
        isActive
          ? isDark
            ? 'primary.200'
            : 'primary.500'
          : !isScrolled && isDark
            ? 'white'
            : 'gray.700'
      }
      _hover={{
        color: !isScrolled && isDark ? 'whiteAlpha.800' : 'primary.500',
      }}
    >
      <Link
        href={item.link as string}
        {...(isExternal && {
          target: '_blank',
          rel: 'noreferrer noopener',
        })}
      >
        {item[locale || 'en']}
      </Link>
    </ChakraLink>
  )
}
