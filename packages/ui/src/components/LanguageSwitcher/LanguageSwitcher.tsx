import { FC, useCallback } from 'react'

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

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
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        rounded="full"
        // leftIcon={<Flag locale={router.locale} boxSize={6} />}
        {...(responsive && {
          iconSpacing: { base: 0, lg: 2 },
          px: 2,
        })}
        colorScheme={'gray'}
      >
        <Text
          pr={1}
          {...(responsive && {
            display: { base: 'none', lg: 'block' },
          })}
        >
          {LanguageNames[router.locale]}
        </Text>
      </MenuButton>
      <MenuList>
        {router.locales
          .filter(locale => locale !== router.locale)
          .map(locale => (
            <MenuItem
              key={locale}
              onClick={() => switchLocale(locale as StrapiLocale)}
              icon={<Flag locale={locale as StrapiLocale} boxSize={8} />}
            >
              {LanguageNames[locale as StrapiLocale]}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  )
}
