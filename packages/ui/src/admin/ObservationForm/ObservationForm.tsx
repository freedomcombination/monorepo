import { FC, useEffect } from 'react'

import {
  Button,
  HStack,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
// import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FiArrowRight } from 'react-icons/fi'

import { useAuthContext } from '@fc/context'
import { useCreateModelMutation } from '@fc/services'
import { Observation, ObservationCreateInput } from '@fc/types/src/observation'
import { toastMessage } from '@fc/utils'

import { observationFormSchema } from './schema'
import { ObservationFormFieldValues } from './types'
import { FormItem } from '../../components'

export type ObservationFormProps = {
  profileId: number
  onSuccess?: () => void
}

export const ObservationForm: FC<ObservationFormProps> = ({
  profileId,
  onSuccess,
}) => {
  // const { t } = useTranslation()
  const { profile } = useAuthContext()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm<ObservationFormFieldValues>({
    resolver: yupResolver(observationFormSchema),
    mode: 'all',
  })

  const { mutate, isSuccess, isPending } = useCreateModelMutation<
    Observation,
    ObservationCreateInput
  >('observations')

  useEffect(() => {
    if (profile) {
      setValue('creator', profile.id)
      setValue('profile', profileId)
    }
  }, [profile, isSuccess])

  useEffect(() => {
    if (isSuccess) reset()
  }, [isSuccess, reset])

  const handleSendForm = async ({ content }: ObservationCreateInput) => {
    try {
      const body = {
        content,
        creator: profile?.id,
        profile: profileId,
      } as ObservationCreateInput

      mutate(body, { onSuccess: () => onSuccess?.() })
    } catch (error) {
      toastMessage(
        'Error',
        "Couldn't send observation. Please try again later.",
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
        Add Observation
      </Text>
      <VStack
        as="form"
        onSubmit={handleSubmit(handleSendForm)}
        alignItems="flex-start"
        justify="flex-start"
      >
        <Stack w="100%" alignItems="flex-start">
          <HStack w="full" align="start">
            <FormItem
              as={Textarea}
              name="content"
              hideLabel
              register={register}
              errors={errors}
              {...useBreakpointValue({ base: { rows: 1 }, sm: { rows: 3 } })}
            />
          </HStack>
        </Stack>
        <Button
          display={{ base: 'none', sm: 'flex' }}
          alignSelf="flex-end"
          rightIcon={<FiArrowRight />}
          isLoading={isPending}
          isDisabled={!isValid}
          type="submit"
        >
          Send
        </Button>
      </VStack>
    </Stack>
  )
}
