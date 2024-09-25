import { useState } from 'react'

import { Center, Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FaSave } from 'react-icons/fa'
import {
  FaCircleArrowRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6'
import * as yup from 'yup'

import { Button } from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { mutation } from '@fc/services/common/mutation'
import type { Profile, ProfileUpdateInput } from '@fc/types'

import { ButtonLink } from '../ButtonLink'
import { FormItem } from '../FormItem'

const schema = yup.object().shape({
  linkedin: yup.string().url(),
  twitter: yup.string().url(),
  instagram: yup.string().url(),
  facebook: yup.string().url(),
})

type SocialFormValues = yup.InferType<typeof schema>

const SocialRightElement = ({
  url,
  label,
}: {
  url?: string
  label: string
}) => {
  return (
    <ButtonLink
      href={url ?? ''}
      isExternal
      data-testid={`link-social-${label}`}
      leftIcon={<FaCircleArrowRight />}
      size={'lg'}
      colorPalette="black"
      variant={'plain'}
      aria-label={url}
      rounded={'full'}
      disabled={!url}
    />
  )
}

export const Socials = () => {
  const { profile, token, checkAuth } = useAuthContext()
  const { t } = useTranslation()

  const [saving, setSaving] = useState(false)

  const {
    register,
    formState: { dirtyFields, errors },
    handleSubmit,
    watch,
  } = useForm<SocialFormValues>({
    values: {
      instagram: profile?.instagram ?? undefined,
      linkedin: profile?.linkedin ?? undefined,
      twitter: profile?.twitter ?? undefined,
      facebook: profile?.facebook ?? undefined,
    },
    resolver: yupResolver(schema),
  })

  const hasChanged = Object.keys(dirtyFields).length > 0

  const [linkedin, twitter, instagram, facebook] = watch([
    'linkedin',
    'twitter',
    'instagram',
    'facebook',
  ])

  const onSubmit = async (data: SocialFormValues) => {
    if (!profile || !token) return

    setSaving(true)
    await mutation<Profile, ProfileUpdateInput>({
      endpoint: 'profiles',
      method: 'put',
      id: profile.id,
      body: data,
      token,
    })

    await checkAuth()
    setSaving(false)
  }

  if (!profile) {
    return (
      <Center width={'100%'} height={250} flex={1}>
        <Text>{t('profile.not-found')}</Text>
      </Center>
    )
  }

  return (
    <Stack gap={8} as={'form'} onSubmit={handleSubmit(onSubmit)}>
      <FormItem
        errors={errors}
        register={register}
        name="linkedin"
        leftElement={<FaLinkedin />}
        rightElement={<SocialRightElement label="linkedin" url={linkedin} />}
        size={'lg'}
      />
      <FormItem
        errors={errors}
        register={register}
        name="facebook"
        leftElement={<FaFacebook />}
        rightElement={<SocialRightElement label="facebook" url={facebook} />}
        size={'lg'}
      />
      <FormItem
        errors={errors}
        register={register}
        name="twitter"
        leftElement={<FaXTwitter />}
        rightElement={<SocialRightElement label="twitter" url={twitter} />}
        size={'lg'}
      />
      <FormItem
        errors={errors}
        register={register}
        name="instagram"
        leftElement={<FaInstagram />}
        rightElement={<SocialRightElement label="instagram" url={instagram} />}
        size={'lg'}
      />

      <Button
        disabled={!hasChanged}
        data-testid="button-save-socials"
        leftIcon={<FaSave />}
        size={'lg'}
        loading={saving}
        alignSelf={'start'}
        type={'submit'}
      >
        {t('save')}
      </Button>
    </Stack>
  )
}
