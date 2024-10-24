import { FC } from 'react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import type { StrapiLocale } from '@fc/types'

import { LocaleSwitcherProps } from './types'
import { useScroll } from '../../hooks'

const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ isDark, isMobile }) => {
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
    <ButtonGroup spacing={0} size="sm" alignItems="center">
      {/* TODO: Remove after storybook test */}
      {locales.map(code => {
        if (query['slug'] && !slugs?.[code]) return null

        let variant = 'ghost'
        if (locale === code) {
          if (!isScrolled && isDark) variant = 'solid'
          else variant = 'outline'
        }

        const label = isMobile ? `mobile-${code}` : code
        const testid = isMobile ? `button-m-${code}` : `button-d-${code}`

        return !isScrolled && isDark ? (
          <Button
            key={code}
            aria-label={label}
            data-testid={testid}
            px={2}
            onClick={() => handleChangeLanguage(code)}
            colorScheme={
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
            aria-label={label}
            data-testid={testid}
            px={2}
            onClick={() => handleChangeLanguage(code)}
            colorScheme={
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
    </ButtonGroup>
  )
}

export default LocaleSwitcher
