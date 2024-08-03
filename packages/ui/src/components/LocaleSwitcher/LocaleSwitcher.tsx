import { FC } from 'react'

import { HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { StrapiLocale } from '@fc/types'

import { LocaleSwitcherProps } from './types'
import { useScroll } from '../../hooks'
import { Button, ButtonProps } from '../Button'

const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ isDark }) => {
  const { push, pathname, locale, asPath, components, query, locales } =
    useRouter()
  const isScrolled = useScroll()

  // We pass localized slugs to pageProps from getStaticProps or getServerSideProps
  const slugs = components?.[pathname].props.pageProps?.slugs

  // TODO: Redirect to localized path for static pages
  const handleChangeLanguage = async (locale: StrapiLocale) => {
    const targetSlug = slugs?.[locale] || asPath
    push(targetSlug, undefined, { locale, scroll: false })
  }

  return (
    <HStack gap={0} alignItems="center">
      {/* TODO: Remove after storybook test */}
      {locales.map(code => {
        if (query['slug'] && !slugs?.[code]) return null

        let variant: ButtonProps['variant'] = 'ghost'

        if (locale === code) {
          if (!isScrolled && isDark) variant = 'solid'
          else variant = 'outline'
        }

        return !isScrolled && isDark ? (
          <Button
            key={code}
            size="sm"
            px={2}
            onClick={() => handleChangeLanguage(code)}
            colorPalette={
              locale === code
                ? 'primary'
                : !isScrolled
                  ? isDark
                    ? 'whiteAlpha'
                    : 'blackAlpha'
                  : 'blackAlpha'
            }
            variant={variant}
          >
            {code.toUpperCase()}
          </Button>
        ) : (
          <Button
            key={code}
            size="sm"
            px={2}
            onClick={() => handleChangeLanguage(code)}
            colorPalette={
              locale === code
                ? 'primary'
                : !isScrolled && isDark
                  ? 'gray'
                  : 'blackAlpha'
            }
            variant={variant}
          >
            {code.toUpperCase()}
          </Button>
        )
      })}
    </HStack>
  )
}

export default LocaleSwitcher
