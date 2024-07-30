import { Button, Container, HStack, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthContext } from '@fc/context'
import { toastMessage } from '@fc/utils'

import { ForgotPasswordFieldValues } from './types'
import { ButtonLink } from '../ButtonLink'
import { FormItem } from '../FormItem'

const schema = yup.object({
  email: yup.string().email().required(),
})

export const ForgotPasswordForm = () => {
  const { t } = useTranslation()
  const { site } = useAuthContext()
  const { locale } = useRouter()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFieldValues>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: (values: ForgotPasswordFieldValues) =>
      axios.post('/api/auth/forgot-password', {
        ...values,
        site,
        locale,
      }),
    onSuccess: () => {
      toastMessage(null, t('forgot-pass.text'), 'success')
      reset()
    },
    onError: err => {
      const code = (err as any)?.details?.code
      toastMessage(t('error'), code ? t(code) : null, 'error')
    },
  })

  const onSubmit: SubmitHandler<ForgotPasswordFieldValues> = data => {
    mutate(data)
  }

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack
        gap="8"
        shadow="base"
        bg="white"
        p={{ base: 8, lg: 12 }}
        rounded="lg"
      >
        <Stack gap="6">
          <Stack gap={{ base: '', md: '3' }} textAlign="center">
            <Heading>{t('forgot-pass.link')}</Heading>
          </Stack>
        </Stack>
        <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="5">
            <FormItem
              id="email"
              type="email"
              register={register}
              errors={errors}
              name="email"
            />
          </Stack>
          <Stack gap="6">
            <HStack>
              <ButtonLink href="/auth/login" variant="link">
                {t('login.signin')}
              </ButtonLink>
            </HStack>
            <Button type="submit" isLoading={isPending}>
              {t('submit')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
