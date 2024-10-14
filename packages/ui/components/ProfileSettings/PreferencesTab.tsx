import { FC, useEffect, useState } from 'react'

import { Button, FormLabel, HStack, Stack, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useAuthContext } from '@fc/context/auth'
import { mutation } from '@fc/services/common/mutation'
import { Profile, ProfileUpdateInput, StrapiLocale } from '@fc/types'

import { I18nNamespaces } from '../../@types/i18next'

export const PreferencesTab: FC = () => {
  const { profile, token, checkAuth } = useAuthContext()
  const { t } = useTranslation()
  const toast = useToast()
  const [langChanged, setLangChanged] = useState(false)

  const langList: {
    locale: StrapiLocale
    tKey: keyof I18nNamespaces['common']
  }[] = [
    { locale: 'en', tKey: 'profile.tabs.preferences.lang.english' },
    { locale: 'nl', tKey: 'profile.tabs.preferences.lang.dutch' },
    { locale: 'tr', tKey: 'profile.tabs.preferences.lang.turkish' },
  ]

  const currentLang = profile?.locale ?? 'en'

  useEffect(() => {
    if (!langChanged) return

    toast({
      title: t('profile.tabs.preferences.lang.success', {
        lang: t(langList.find(({ locale }) => locale === currentLang)!.tKey),
      }),
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

    setLangChanged(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.locale])

  const changeLocale = async (locale: StrapiLocale) => {
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
      setLangChanged(true)
    }
  }

  return (
    <Stack spacing={8}>
      <Stack>
        <FormLabel
          mb={0}
          fontSize="sm"
          fontWeight={600}
          textTransform={'capitalize'}
        >
          {t('profile.tabs.preferences.lang.label')}
        </FormLabel>
        <HStack spacing={4}>
          {langList.map(({ locale, tKey }) => (
            <Button
              key={locale}
              variant={locale === currentLang ? 'solid' : 'outline'}
              colorScheme="primary"
              onClick={() => changeLocale(locale)}
            >
              {t(tKey)}
            </Button>
          ))}
        </HStack>
      </Stack>

      {/* TODO: Add other preferences like would you like to receive emails for our activities */}
    </Stack>
  )
}
