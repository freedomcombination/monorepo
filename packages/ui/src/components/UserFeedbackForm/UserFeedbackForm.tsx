import React from 'react'

import {
  Box,
  ButtonGroup,
  HStack,
  IconButton,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldErrorsImpl, useForm } from 'react-hook-form'
import { IoSend } from 'react-icons/io5'
import { ObjectSchema } from 'yup'

import { RecaptchaKeys } from '@fc/config'
import { useRecaptchaToken, useUserFeedbackMutation } from '@fc/services'
import { UserFeedbackCreateInput } from '@fc/types'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@fc/ui'

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
        onClose={closeModal}
        isOpen={isOpen}
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
              <ButtonGroup>
                {[1, 2, 3, 4, 5].map(p => (
                  <IconButton
                    key={p}
                    colorPalette={point === p ? 'primary' : 'gray'}
                    variant={point === p ? 'solid' : 'outline'}
                    isRound
                    onClick={() => handlePoint(p)}
                    aria-label={`Give ${p} point`}
                    icon={<Text fontSize={'lg'}>{p}</Text>}
                    size={'lg'}
                  />
                ))}
              </ButtonGroup>
              <HStack>
                <FormItem<CreateUserFeedbackFormFieldValues>
                  as={Textarea}
                  name="comment"
                  register={register}
                  errors={
                    errors as FieldErrorsImpl<CreateUserFeedbackFormFieldValues>
                  }
                  isRequired
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
