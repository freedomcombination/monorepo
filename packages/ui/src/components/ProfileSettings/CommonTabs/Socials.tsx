import { useEffect, useState } from 'react'

import { Button, Center, IconButton, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaSave } from 'react-icons/fa'
import {
  FaCircleArrowRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { Profile, ProfileUpdateInput } from '@fc/types'

import { MultiLine, SingleDetail } from '../CommonComponents'

export const Socials = () => {
  const { profile, token, checkAuth } = useAuthContext()
  const { t } = useTranslation()
  const [details, setDetails] = useState<Profile>({
    linkedin: profile?.linkedin ?? null,
    twitter: profile?.twitter ?? null,
    instagram: profile?.instagram ?? null,
    facebook: profile?.facebook ?? null,
  } as Profile)
  const [saving, setSaving] = useState(false)

  const hasChanged = Object.entries(details).some(
    ([key, value]) => profile?.[key as keyof Profile] !== value,
  )

  const goSocial = (addr: string, name?: string | null) => {
    return (
      <IconButton
        icon={<FaCircleArrowRight />}
        size={'lg'}
        colorScheme="black"
        variant={'ghost'}
        aria-label={addr}
        rounded={'full'}
        isDisabled={!name}
        onClick={() => {
          window.open(addr + name, '_blank')
        }}
      />
    )
  }

  useEffect(() => {
    if (!saving || !profile) {
      setSaving(false)

      return
    }

    Mutation.put<Profile, ProfileUpdateInput>(
      'profiles',
      profile.id,
      details as ProfileUpdateInput,
      token as string,
    )
      .catch(e => console.log('Social update error', e))
      .finally(() => {
        checkAuth().finally(() => {
          setSaving(false)
        })
      })

    return () => setSaving(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving])

  if (!profile) {
    return (
      <Center width={'100%'} height={250} flex={1}>
        <Text>{t('profile.not-found')}</Text>
      </Center>
    )
  }

  return (
    <MultiLine
      buttons={
        <Button
          isDisabled={!hasChanged}
          leftIcon={<FaSave />}
          size={'md'}
          isLoading={saving}
          onClick={() => setSaving(true)}
        >
          {t('save')}
        </Button>
      }
    >
      <SingleDetail
        title={'Linkedin'}
        placeholder={t('profile.social.ph', { name: 'Linkedin' })}
        defaultValue={details.linkedin}
        left={<FaLinkedin />}
        right={goSocial('https://www.linkedin.com/in/', details.linkedin)}
        onChange={val => setDetails({ ...details, linkedin: val })}
      />

      <SingleDetail
        title={'X'}
        placeholder={t('profile.social.ph', { name: 'X' })}
        defaultValue={details.twitter}
        left={<FaXTwitter />}
        right={goSocial('https://twitter.com/', details.twitter)}
        onChange={val => setDetails({ ...details, twitter: val })}
      />

      <SingleDetail
        title={'Instagram'}
        placeholder={t('profile.social.ph', { name: 'Instagram' })}
        defaultValue={details.instagram}
        left={<FaInstagram />}
        right={goSocial('https://www.instagram.com/', details.instagram)}
        onChange={val => setDetails({ ...details, instagram: val })}
      />

      <SingleDetail
        title={'Facebook'}
        placeholder={t('profile.social.ph', { name: 'Facebook' })}
        defaultValue={details.linkedin}
        left={<FaFacebook />}
        right={goSocial('https://www.facebook.com/', details.facebook)}
        onChange={val => setDetails({ ...details, facebook: val })}
      />
    </MultiLine>
  )
}
