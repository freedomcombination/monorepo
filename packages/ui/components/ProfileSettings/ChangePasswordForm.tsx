import { Box, Button, Heading, Stack, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslation, TFunction } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import * as Yup from 'yup'

import { API_URL } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'

import { FormItem } from '../FormItem'

// const schema = Yup.object().shape({
const schema = (t: TFunction) =>
  Yup.object({
    currentPassword: Yup.string().required(),
    password: Yup.string()
      .min(8, t('login.password.warning', { count: 8 }) as string)
      .required()
      .matches(
        RegExp('(.*[a-z].*)'),
        t('login.password.matches.lowercase') as string,
      )
      .matches(
        RegExp('(.*[A-Z].*)'),
        t('login.password.matches.uppercase') as string,
      )
      .matches(
        RegExp('(.*\\d.*)'),
        t('login.password.matches.number') as string,
      ),
    // password: Yup.string().required(),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), undefined],
      'Passwords must match',
    ),
  })

type PasswordFormValues = Yup.InferType<ReturnType<typeof schema>>

const changePassword = async (
  data: PasswordFormValues,
  token: string | null,
) => {
  const url = API_URL + '/api/auth/change-password'

  try {
    const result = await axios.post(url, data, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    return result.data
  } catch (error: any) {
    // TODO: Add global Strapi error handling
    throw new Error(error?.response?.data?.error?.message || error.message)
  }
}

export const ChangePasswordForm = () => {
  const { token, checkAuth } = useAuthContext()
  const toast = useToast()
  const { t } = useTranslation()

  const { mutate, isError, error, isPending } = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (data: PasswordFormValues) => changePassword(data, token),
    onSuccess: () => {
      checkAuth()
      reset()
    },
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<PasswordFormValues>({
    resolver: yupResolver(schema(t)),
  })

  const onSubmit = async (data: PasswordFormValues) => {
    mutate(data, {
      onError: () => {
        toast({
          id: 'error-update-password',
          title: 'Error',
          description: t('update-failed'),
          status: 'error',
          duration: 10000,
          isClosable: true,
        })
      },
      onSuccess: () => {
        toast({
          id: 'success-update-password',
          title: 'Success',
          description: t('update-success'),
          status: 'success',
          duration: 10000,
          isClosable: true,
        })
      },
    })
  }

  return (
    <Stack as={'form'} spacing={8} onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Heading size="lg">{t('profile.security.password')}</Heading>
        {isError && <Box color={'red.500'}>{error?.message}</Box>}
      </Box>
      <FormItem
        errors={errors}
        label={t('profile.old-password')}
        name="currentPassword"
        placeholder="Current password"
        register={register}
        type={'password'}
        autoComplete="current-password"
        hideLabel
        size={'lg'}
      />

      <Stack>
        <FormItem
          errors={errors}
          register={register}
          name="password"
          placeholder="New password"
          type={'password'}
          autoComplete="new-password"
          hideLabel
          size={'lg'}
        />
        <FormItem
          errors={errors}
          register={register}
          name="passwordConfirmation"
          placeholder="Password confirmation"
          type={'password'}
          autoComplete="new-password"
          hideLabel
          size={'lg'}
        />
      </Stack>

      <Button
        data-testid={'button-submit-update-password'}
        leftIcon={<FaEdit />}
        isLoading={isPending}
        size={'lg'}
        alignSelf={'start'}
        type={'submit'}
      >
        {t('profile.change-password')}
      </Button>
    </Stack>
  )
}
