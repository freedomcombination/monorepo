import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { JoinFormFieldValues } from './types'
import { useJoinFormContext } from './useJoinFormContext'
import { Markdown } from '../Markdown'

export const FoundationInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<JoinFormFieldValues>()
  const { foundationInfo } = useJoinFormContext()

  return (
    <Stack direction={{ base: 'column', md: 'column' }} spacing={4}>
      <Markdown source={foundationInfo} />

      <FormControl isRequired isInvalid={!!errors?.foundationConfirmation}>
        <Checkbox
          {...register('foundationConfirmation', {
            required: 'You must accept the Foundation information',
          })}
        >
          {/* TODO: Translate */}I have read and accept the Foundation
          information
        </Checkbox>
        <FormErrorMessage>
          {errors?.foundationConfirmation &&
            errors?.foundationConfirmation.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  )
}
