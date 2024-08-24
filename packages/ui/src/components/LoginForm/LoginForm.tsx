import { FC, useEffect, useState } from 'react'

import {
  Container,
  Separator,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Alert, Button, Checkbox } from '@fc/chakra'
import { useAuthContext } from '@fc/context'

import { loginSchema } from './schema'
import { LoginFormFieldValues } from './types'
import { ButtonLink } from '../ButtonLink'
import { FormItem } from '../FormItem'
import {
  SocialLoginButtons,
  SocialLoginButtonsProps,
} from '../SocialLoginButtons'

type LoginFormProps = { isLoginOnly?: boolean } & Pick<
  SocialLoginButtonsProps,
  'providersToBeShown'
>

export const LoginForm: FC<LoginFormProps> = ({
  isLoginOnly = false,
  providersToBeShown = [],
}) => {
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFieldValues>({
    resolver: yupResolver(loginSchema),
    mode: 'all',
  })

  const router = useRouter()
  const { login, loading, error } = useAuthContext()
  const { returnUrl } = router.query

  useEffect(() => {
    if (error) {
      setErrorMessage(error)
    }
  }, [error])

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginFormFieldValues) =>
      login(body.identifier, body.password),
    onSuccess: async () => {
      router.push(returnUrl ? returnUrl.toString() : '/')
    },
  })

  const handleSubmitSign: SubmitHandler<LoginFormFieldValues> = async data => {
    // i dont know why but this function is not firing
    loginMutation.mutate(data)
  }

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack
        gap={8}
        shadow="base"
        bg="white"
        p={{ base: 8, lg: 12 }}
        rounded="lg"
      >
        <Stack gap={6}>
          <Stack gap={{ base: '2', md: '3' }} textAlign="center">
            <Heading>{t('login.title')}</Heading>
            {!isLoginOnly && (
              <HStack gap={1} justify="center">
                <Text color="muted">{t('login.no-account')}</Text>

                <ButtonLink href="/auth/register" variant="plain">
                  {t('login.signup')}
                </ButtonLink>
              </HStack>
            )}
          </Stack>
        </Stack>
        <Stack gap={6} as="form" onSubmit={handleSubmit(handleSubmitSign)}>
          {errorMessage && (
            <Alert status="error" data-testid="error-auth">
              {errorMessage}
            </Alert>
          )}
          <Stack gap={5}>
            <FormItem
              name="identifier"
              autoComplete="email"
              register={register}
              errors={errors}
            />
            <FormItem
              name="password"
              type="password"
              autoComplete="current-password"
              register={register}
              errors={errors}
            />
          </Stack>
          <HStack justify="space-between">
            {/* TODO Set session exp time */}
            <Checkbox defaultChecked>{t('login.remember-me')}</Checkbox>

            <ButtonLink
              data-testid="button-forgot-password"
              href="/auth/forgot-password"
              variant="plain"
              size="sm"
            >
              {t('forgot-pass.title')}
            </ButtonLink>
          </HStack>
          <Stack gap={6}>
            <Button
              type="submit"
              data-testid="button-submit-login"
              loading={loading}
            >
              {t('login.signin')}
            </Button>
            {providersToBeShown.length > 0 && (
              <HStack>
                <Separator />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  {t('login.with')}
                </Text>
                <Separator />
              </HStack>
            )}
            <SocialLoginButtons providersToBeShown={providersToBeShown} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
