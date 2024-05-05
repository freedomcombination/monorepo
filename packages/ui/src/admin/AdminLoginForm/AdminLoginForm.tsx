import { useState } from 'react'

import {
  Box,
  Button,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuthContext } from '@fc/context'

import { adminLoginSchema } from './schema'
import {
  Container,
  FormItem,
  LoginFormFieldValues,
  Navigate,
  WAvatar,
  WImage,
} from '../../components'

export const AdminLoginForm = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormFieldValues>({
    resolver: yupResolver(adminLoginSchema),
    mode: 'all',
  })

  const [isRedirecting, setIsRedirecting] = useState(false)

  const { isLoading: isAuthLoading, login, checkAuth } = useAuthContext()

  const router = useRouter()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginFormFieldValues) =>
      login(body.identifier, body.password),
  })

  const handleSubmitSign: SubmitHandler<LoginFormFieldValues> = async data => {
    loginMutation.mutate(data, {
      onError: e => console.error('Login error', e),
      onSuccess: async () => {
        checkAuth()
        setIsRedirecting(true)
        reset()
        await router.push('/')
        setIsRedirecting(false)
      },
    })
  }

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} h="full">
      <Box pos="relative" h={{ base: 200, lg: 'full' }}>
        <WImage
          style={{ objectFit: 'cover' }}
          src={`/images/freedom-bird.jpeg`}
          alt={'admin'}
        />
      </Box>
      <Container maxW={{ base: 'full', lg: 300 }}>
        {/* right side (second container) */}
        <Stack
          h="full"
          w="full"
          textAlign="center"
          spacing={4}
          justify="center"
          pb={8}
          pt={{ base: 8, lg: '50%' }}
        >
          <Navigate href="/">
            <VStack textAlign="center" w={'full'}>
              <WAvatar size="2xl" src={`/images/foundation-logo.svg`} />

              <Text fontSize="xl" color={'blue.500'} fontWeight={900}>
                FREEDOM COMBINATION
              </Text>
            </VStack>
          </Navigate>

          <Stack spacing={4} flex={1}>
            <Stack
              spacing={4}
              as="form"
              onSubmit={handleSubmit(handleSubmitSign)}
            >
              <FormItem
                w="full"
                name="identifier"
                register={register}
                errors={errors}
                autoComplete="username"
              />
              <FormItem
                w="full"
                name="password"
                type="password"
                autoComplete="current-password"
                register={register}
                errors={errors}
              />
              <Button
                isLoading={isAuthLoading || isRedirecting}
                w="full"
                type="submit"
              >
                {t('login.signin')}
              </Button>
              {loginMutation.isError &&
                ((loginMutation.error as any)?.response?.data?.type ===
                'unauthorized' ? (
                  <Text fontSize={'sm'} color={'red.500'}>
                    <Trans
                      i18nKey="login.error.unauthorized"
                      components={{
                        a: (
                          <Link
                            isExternal
                            href={'https://freedomcombination.com/tr/contact'}
                            color="blue.500"
                          />
                        ),
                      }}
                    />
                  </Text>
                ) : (
                  <Text color="red.500" fontSize="sm">
                    {(loginMutation.error as any)?.response?.data?.message ||
                      'An error occured'}
                  </Text>
                ))}
            </Stack>
            {/* TODO Set session exp time */}

            <Button
              as={Navigate}
              href="/forgot-password"
              variant="link"
              size="sm"
            >
              {t('forgot-pass.link')}
            </Button>
          </Stack>

          <Text fontSize={'xs'}>
            Freedom Combination &copy; {new Date().getFullYear()} All rights
            reserved
          </Text>
        </Stack>
      </Container>
    </SimpleGrid>
  )
}
