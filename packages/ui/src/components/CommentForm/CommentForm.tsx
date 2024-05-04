import { FC, useEffect } from 'react'

import {
  Button,
  HStack,
  IconButton,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FiArrowRight } from 'react-icons/fi'

import { useAuthContext } from '@fc/context'
import { useCreateModelMutation, useRecaptchaToken } from '@fc/services'
import { Comment, CommentCreateInput } from '@fc/types'
import { toastMessage } from '@fc/utils'

import { commentFormSchema } from './schema'
import { CommentFormFieldValues, CommentFormProps } from './types'
import { FormItem } from '../FormItem'
import { WAvatar } from '../WAvatar'

export const CommentForm: FC<CommentFormProps> = ({ artId, onSuccess }) => {
  const { t } = useTranslation()
  const { user, profile } = useAuthContext()
  const recaptchaToken = useRecaptchaToken('comment')

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
      toastMessage(
        'Error',
        "Couldn't send comment. Please try again later.",
        'error',
      )
    }
  }

  return (
    <Stack
      display={isSuccess ? 'none' : 'flex'}
      spacing={4}
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
              hideLabel
              register={register}
              errors={errors}
            />
            <FormItem
              name="email"
              type="email"
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
              isLoading={isPending}
              isDisabled={!isValid}
              type="submit"
            />
          </HStack>
        </Stack>
        <Tooltip
          label={recaptchaToken ? null : 'You are not allowed to comment'}
        >
          <Button
            display={{ base: 'none', sm: 'flex' }}
            alignSelf="flex-end"
            rightIcon={<FiArrowRight />}
            isLoading={isPending}
            isDisabled={!isValid || !recaptchaToken}
            type="submit"
          >
            {t('comment-form.send')}
          </Button>
        </Tooltip>
      </VStack>
    </Stack>
  )
}
