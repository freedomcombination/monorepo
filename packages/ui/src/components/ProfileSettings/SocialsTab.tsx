import { useState } from 'react'

import { Button, Center, Stack, Text } from '@chakra-ui/react'
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

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { Profile, ProfileUpdateInput } from '@fc/types'

import { ButtonLink } from '../ButtonLink'
import { FormItem } from '../FormItem'

const schema = yup.object().shape({
  linkedin: yup.string().url(),
  twitter: yup.string().url(),
  instagram: yup.string().url(),
  facebook: yup.string().url(),
})

type SocialFormValues = yup.InferType<typeof schema>

const SocialRightElement = ({ url }: { url?: string }) => {
  return (
    <ButtonLink
      href={url ?? ''}
      target="_blank"
      rel="noreferrer noopener"
      leftIcon={<FaCircleArrowRight />}
      size={'lg'}
      colorScheme="black"
      variant={'ghost'}
      aria-label={url}
      rounded={'full'}
      isDisabled={!url}
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
    await Mutation.put<Profile, ProfileUpdateInput>(
      'profiles',
      profile?.id,
      data,
      token,
    )

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
        rightElement={<SocialRightElement url={linkedin} />}
        size={'lg'}
      />
      <FormItem
        errors={errors}
        register={register}
        name="facebook"
        leftElement={<FaFacebook />}
        rightElement={<SocialRightElement url={facebook} />}
        size={'lg'}
      />
      <FormItem
        errors={errors}
        register={register}
        name="twitter"
        leftElement={<FaXTwitter />}
        rightElement={<SocialRightElement url={twitter} />}
        size={'lg'}
      />
      <FormItem
        errors={errors}
        register={register}
        name="instagram"
        leftElement={<FaInstagram />}
        rightElement={<SocialRightElement url={instagram} />}
        size={'lg'}
      />

      <Button
        isDisabled={!hasChanged}
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
