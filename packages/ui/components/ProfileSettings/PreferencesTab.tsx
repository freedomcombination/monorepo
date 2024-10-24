import { FC } from 'react'

import { Button, FieldLabel, HStack, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { toaster } from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { mutation } from '@fc/services/common/mutation'
import { Profile, ProfileUpdateInput, StrapiLocale } from '@fc/types'

export const PreferencesTab: FC = () => {
  const { profile, token, checkAuth } = useAuthContext()
  const { t } = useTranslation()

  const langList: {
    locale: StrapiLocale
    name: string
  }[] = [
    { locale: 'en', name: 'English' },
    { locale: 'nl', name: 'Nederlands' },
    { locale: 'tr', name: 'Türkçe' },
  ]

  const currentLang = profile?.locale ?? 'en'

  const changeLocale = async (locale: StrapiLocale, name: string) => {
    if (!profile || !token) return
    if (locale !== currentLang) {
      await mutation<Profile, ProfileUpdateInput>({
        endpoint: 'profiles',
        method: 'put',
        id: profile.id,
        body: { locale },
        token,
      })
      await checkAuth()
      toaster.create({
        title: t('profile.tabs.preferences.lang.success', {
          lang: name,
        }),
        type: 'success',
      })
    }
  }

  return (
    <Stack gap={8}>
      <Stack>
        <FieldLabel
          mb={0}
          fontSize="sm"
          fontWeight={600}
          textTransform={'capitalize'}
        >
          {t('profile.tabs.preferences.lang.label')}
        </FieldLabel>
        <HStack gap={4}>
          {langList.map(({ locale, name }) => (
            <Button
              key={locale}
              variant={locale === currentLang ? 'solid' : 'outline'}
              colorScheme="primary"
              onClick={() => changeLocale(locale, name)}
            >
              {name}
            </Button>
          ))}
        </HStack>
      </Stack>

      {/* TODO: Add other preferences like would you like to receive emails for our activities */}
    </Stack>
  )
}
