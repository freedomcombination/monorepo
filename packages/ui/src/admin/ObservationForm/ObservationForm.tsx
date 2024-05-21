import { FC, useEffect } from 'react'

import { Button, Stack, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FiArrowRight } from 'react-icons/fi'

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ObservationFormFieldValues>({
    resolver: yupResolver(observationFormSchema),
    mode: 'all',
    defaultValues: {
      profile: profileId,
    },
  })

  const { mutate, isSuccess, isPending } = useCreateModelMutation<
    Observation,
    ObservationCreateInput
  >('observations')

  useEffect(() => {
    if (isSuccess) reset()
  }, [isSuccess, reset])

  const handleSendForm = async ({ content }: ObservationCreateInput) => {
    try {
      const body = {
        content,
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
    <form onSubmit={handleSubmit(handleSendForm)}>
      <Stack spacing={4}>
        <FormItem
          as={Textarea}
          name="content"
          hideLabel
          register={register}
          errors={errors}
        />

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
      </Stack>
    </form>
  )
}
