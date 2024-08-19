import { FC, useEffect } from 'react'

import {
  HStack,
  IconButton,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FiArrowRight } from 'react-icons/fi'

import { Button, Tooltip, toaster } from '@fc/chakra'
import { RecaptchaKeys } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { useCreateModelMutation, useRecaptchaToken } from '@fc/services'
import { Comment, CommentCreateInput } from '@fc/types'

import { commentFormSchema } from './schema'
import { CommentFormFieldValues, CommentFormProps } from './types'
import { FormItem } from '../FormItem'
import { WAvatar } from '../WAvatar'

export const CommentForm: FC<CommentFormProps> = ({ artId, onSuccess }) => {
  const { t } = useTranslation()
  const { user, profile } = useAuthContext()
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.COMMENT)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<CommentFormFieldValues>({
    resolver: yupResolver(commentFormSchema),
    defaultValues: {
      name: profile?.name || user?.username || '',
      email: profile?.email || '',
    },
    mode: 'all',
  })

  const { mutate, isSuccess, isPending } = useCreateModelMutation<
    Comment,
    CommentCreateInput<'art'>
  >('comments')

  useEffect(() => {
    if (isSuccess) reset()
  }, [isSuccess, reset])

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || user?.username || '')
      setValue('email', profile.email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, isSuccess])

  const handleSendForm = async ({
    name,
    content,
    email,
  }: CommentFormFieldValues) => {
    try {
      const body = {
        name,
        content,
        email,
        art: artId,
        profile: profile?.id,
        recaptchaToken,
        publishedAt: new Date().toISOString(),
      } as CommentCreateInput<'art'>

      mutate(body, { onSuccess: () => onSuccess?.() })
    } catch (error) {
      console.error(error)

      toaster.create({
        title: 'Error',
        description: "Couldn't send comment. Please try again later.",
        type: 'error',
      })
    }
  }

  return (
    <Stack
      display={isSuccess ? 'none' : 'flex'}
      gap={4}
      p={4}
      boxShadow="base"
      borderRadius="sm"
      bg="white"
    >
      <Text
        textAlign="left"
        fontSize="16px"
        fontWeight={600}
        textTransform="capitalize"
      >
        {t('comments')}
      </Text>
      <VStack
        as="form"
        onSubmit={handleSubmit(handleSendForm)}
        alignItems="flex-start"
        justify="flex-start"
      >
        <Stack w="100%" alignItems="flex-start">
          <Stack
            display={profile ? 'none' : 'flex'}
            direction={{ base: 'column', lg: 'row' }}
            w="full"
          >
            <FormItem
              name="name"
              autoComplete="name"
              hideLabel
              register={register}
              errors={errors}
            />
            <FormItem
              name="email"
              type="email"
              autoComplete="email"
              hideLabel
              register={register}
              errors={errors}
            />
          </Stack>

          <HStack w="full" align="start">
            {profile && (
              <WAvatar
                size="sm"
                src={`${profile?.avatar}`}
                name={user?.username}
              />
            )}
            <FormItem
              as={Textarea}
              name="content"
              hideLabel
              register={register}
              errors={errors}
              {...useBreakpointValue({ base: { rows: 1 }, sm: { rows: 3 } })}
            />
            <IconButton
              display={{ base: 'flex', sm: 'none' }}
              aria-label="Send Comment"
              icon={<FiArrowRight />}
              isRound
              loading={isPending}
              disabled={!isValid}
              type="submit"
            />
          </HStack>
        </Stack>
        <Tooltip
          content={recaptchaToken ? null : 'You are not allowed to comment'}
        >
          <Button
            display={{ base: 'none', sm: 'flex' }}
            alignSelf="flex-end"
            rightIcon={<FiArrowRight />}
            loading={isPending}
            disabled={!isValid || !recaptchaToken}
            type="submit"
          >
            {t('comment-form.send')}
          </Button>
        </Tooltip>
      </VStack>
    </Stack>
  )
}
