import { Button, Container, Heading, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { toastMessage } from '@fc/utils'

import { ForgotPasswordFieldValues } from './types'
import { FormItem } from '../FormItem'

const schema = yup.object({
  email: yup.string().email().required(),
})

export const ForgotPasswordForm = () => {
  const { t } = useTranslation()

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
      axios.post('/api/auth/forgot-password', values),
    onSuccess: () => {
      toastMessage(null, t('forgot-pass.text'), 'success')
      reset()
    },
    onError: () => {
      toastMessage(t('error'), null, 'error')
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
        spacing="8"
        shadow="base"
        bg="white"
        p={{ base: 8, lg: 12 }}
        rounded="lg"
      >
        <Stack spacing="6">
          <Stack spacing={{ base: '', md: '3' }} textAlign="center">
            <Heading>{t('forgot-pass.link')}</Heading>
          </Stack>
        </Stack>
        <Stack spacing="6" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="5">
            <FormItem
              id="email"
              type="email"
              register={register}
              errors={errors}
              name="email"
            />
          </Stack>
          <Stack spacing="6">
            <Button type="submit" isLoading={isPending}>
              {t('submit')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
