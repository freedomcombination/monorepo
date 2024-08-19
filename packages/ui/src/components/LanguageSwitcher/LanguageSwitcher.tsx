import { FC, useCallback } from 'react'

import { MenuContent, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Button, MenuItem, MenuRoot, MenuTrigger } from '@fc/chakra'
import { StrapiLocale } from '@fc/types'

import { Flag } from '../Flag'

type LanguageSwitcherProps = {
  responsive?: boolean
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ responsive }) => {
  const router = useRouter()

  const LanguageNames: Record<StrapiLocale, string> = {
    en: 'EN',
    nl: 'NL',
    tr: 'TR',
  }

  const switchLocale = useCallback(
    (locale: StrapiLocale) => {
      router.push(router.asPath, router.asPath, {
        locale,
      })
    },
    [router],
  )

  return (
    <MenuRoot>
      <MenuTrigger value="language-swithc-menu" asChild>
        <Button
          rounded="full"
          {...(responsive && {
            px: 2,
          })}
          variant={'outline'}
          w={'auto'}
        >
          <Flag locale={router.locale} boxSize={6} />
          <Text
            pr={1}
            {...(responsive && {
              display: { base: 'none', lg: 'block' },
            })}
          >
            {LanguageNames[router.locale]}
          </Text>
        </Button>
      </MenuTrigger>
      <MenuContent>
        {router.locales
          .filter(locale => locale !== router.locale)
          .map(locale => (
            <MenuItem
              key={locale}
              onClick={() => switchLocale(locale as StrapiLocale)}
              value={locale}
            >
              <Flag locale={locale as StrapiLocale} boxSize={8} />
              {LanguageNames[locale as StrapiLocale]}
            </MenuItem>
          ))}
      </MenuContent>
    </MenuRoot>
  )
}
