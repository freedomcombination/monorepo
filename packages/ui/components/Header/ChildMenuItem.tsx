import { FC } from 'react'

import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
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

  const Wrapper = item.link ? Link : Box

  return (
    <Wrapper
      {...(item.link && {
        as: NextLink,
      })}
      href={item.link as string}
      data-testid={`link-${isMobile ? 'm' : 'd'}${item.link}`}
      fontWeight={600}
      cursor={'pointer'}
      p={2}
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
      {item[locale || 'en']}
    </Wrapper>
  )
}
