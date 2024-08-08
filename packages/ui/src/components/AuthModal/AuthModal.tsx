import { useState } from 'react'

import { Link } from '@chakra-ui/next-js'
import { Stack, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Trans, useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuthContext } from '@fc/context'

import { adminLoginSchema } from '../AdminLoginForm/schema'
import { Button } from '../Button'
import { ButtonLink } from '../ButtonLink'
import { FormItem } from '../FormItem'
import { LoginFormFieldValues } from '../LoginForm'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '../Modal'
import { WAvatar } from '../WAvatar'

export const AuthModal = () => {
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

  const {
    isLoading: isAuthLoading,
    login,
    closeAuthModal,
    isAuthModalOpen,
    checkAuth,
  } = useAuthContext()

  const router = useRouter()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: LoginFormFieldValues) =>
      login(body.identifier, body.password),
  })

  const handleSubmitSign: SubmitHandler<LoginFormFieldValues> = async data => {
    loginMutation.mutate(data, {
      onSuccess: async () => {
        await checkAuth()
        setIsRedirecting(true)
        await router.push('/')
        setIsRedirecting(false)
        closeAuthModal()
        reset()
      },
    })
  }

  return (
    <Modal
      centered
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalCloseButton />
        <ModalBody>
          <Stack textAlign="center" gap={4} py={4} justify="center">
            <Link href="/">
              <VStack textAlign="center" w={'full'}>
                <WAvatar boxSize={100} src={`/images/foundation-logo.svg`} />
                <Text fontSize="xl" color={'blue.500'} fontWeight={900}>
                  FREEDOM COMBINATION
                </Text>
              </VStack>
            </Link>
            <Stack gap={4} flex={1}>
              <Stack
                gap={4}
                as="form"
                onSubmit={handleSubmit(handleSubmitSign)}
              >
                <FormItem
                  w="full"
                  name="identifier"
                  autoComplete="email"
                  register={register}
                  errors={errors}
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
                  (loginMutation.error?.message ===
                  'Request failed with status code 401' ? (
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
                      {loginMutation.error?.message || 'An error occured'}
                    </Text>
                  ))}
              </Stack>
              {/* TODO Set session exp time */}
              <ButtonLink href="/forgot-password" variant="link" size="sm">
                {t('forgot-pass.link')}
              </ButtonLink>
            </Stack>
            <Text fontSize={'xs'}>
              Freedom Combination &copy; {new Date().getFullYear()} All rights
              reserved
            </Text>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
