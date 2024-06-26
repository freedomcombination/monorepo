import { FC, useCallback } from 'react'

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { StrapiLocale } from '@fc/types'

import { Flag } from '..'

type LanguageSwitcherProps = {
  responsive?: boolean
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ responsive }) => {
  const router = useRouter()

  const CurrentFlag = Flag[router.locale]

  const currentLanguage = {
    en: 'English',
    nl: 'Nederlands',
    tr: 'Türkçe',
  }

  const LanguageNames: Record<StrapiLocale, string> = {
    en: 'English',
    nl: 'Nederlands',
    tr: 'Türkçe',
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
        leftIcon={<Box boxSize={6} as={CurrentFlag} />}
        {...(responsive && {
          iconSpacing: { base: 0, lg: 2 },
          px: { base: 2, lg: 4 },
        })}
        colorScheme={'gray'}
      >
        <Text
          {...(responsive && {
            display: { base: 'none', lg: 'block' },
          })}
        >
          {currentLanguage[router.locale]}
        </Text>
      </MenuButton>
      <MenuList>
        {Object.entries(Flag)
          .filter(([language]) => language !== router.locale)
          .map(([language, Flag]) => (
            <MenuItem
              key={language}
              onClick={() => switchLocale(language as StrapiLocale)}
              icon={<Box as={Flag} boxSize={8} />}
            >
              {LanguageNames[language as StrapiLocale]}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  )
}
