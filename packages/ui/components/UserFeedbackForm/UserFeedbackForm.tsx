import React from 'react'

import { Box, Group, HStack, Stack, Text, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldErrorsImpl, useForm } from 'react-hook-form'
import { IoSend } from 'react-icons/io5'
import { ObjectSchema } from 'yup'

import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@fc/chakra'
import { RecaptchaKeys } from '@fc/config/constants'
import { useRecaptchaToken } from '@fc/services/common/useRecaptchaToken'
import { useUserFeedbackMutation } from '@fc/services/userFeedback'
import type { UserFeedbackCreateInput } from '@fc/types'

import { createUserFeedbackSchema } from './schema'
import {
  CreateUserFeedbackFormFieldValues,
  CreateUserFeedbackFormProps,
} from './types'
import { FormItem } from '../FormItem'

export const UserFeedbackForm: React.FC<CreateUserFeedbackFormProps> = ({
  isOpen,
  onClose,
}) => {
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.FEEDBACk)
  const { mutateAsync } = useUserFeedbackMutation(recaptchaToken)

  const handleUserFeedback = async (
    data: CreateUserFeedbackFormFieldValues,
  ) => {
    const userFeedback: UserFeedbackCreateInput = {
      comment: data?.comment,
      point: data?.point as number,
      site: window.location.href,
    }
    await mutateAsync(userFeedback)
    reset()
    onClose()
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<CreateUserFeedbackFormFieldValues>({
    resolver: yupResolver(
      createUserFeedbackSchema as ObjectSchema<CreateUserFeedbackFormFieldValues>,
    ),
    mode: 'all',
  })
  const point = watch('point')

  const closeModal = () => {
    reset()
    onClose()
  }
  const handlePoint = (data: number) => {
    setValue('point', data)
  }

  return (
    <Box>
      <Modal
        size="sm"
        onOpenChange={e => (e.open ? null : closeModal())}
        open={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent p={{ base: 2, lg: 4 }}>
          <ModalCloseButton />
          <ModalHeader>
            <Text color={'primary.500'} fontWeight={700} w={'full'}>
              Feedback
            </Text>
          </ModalHeader>
          <ModalBody>
            <Stack
              gap={4}
              as="form"
              onSubmit={handleSubmit(handleUserFeedback)}
            >
              <Group>
                {[1, 2, 3, 4, 5].map(p => (
                  <IconButton
                    key={p}
                    colorPalette={point === p ? 'primary' : 'gray'}
                    variant={point === p ? 'solid' : 'outline'}
                    rounded={'full'}
                    onClick={() => handlePoint(p)}
                    aria-label={`Give ${p} point`}
                    icon={<Text fontSize={'lg'}>{p}</Text>}
                    size={'lg'}
                  />
                ))}
              </Group>
              <HStack>
                <FormItem<CreateUserFeedbackFormFieldValues>
                  as={Textarea}
                  name="comment"
                  register={register}
                  errors={
                    errors as FieldErrorsImpl<CreateUserFeedbackFormFieldValues>
                  }
                  required
                />

                <IconButton
                  aria-label={'Send feedback'}
                  variant={'ghost'}
                  type={'submit'}
                  icon={<IoSend />}
                />
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
