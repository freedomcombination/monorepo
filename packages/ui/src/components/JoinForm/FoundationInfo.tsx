import { FC } from 'react'

import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useFormContext } from 'react-hook-form'

import { JoinFormFieldValues } from './types'
import { Markdown } from '../Markdown'

type FoundationInfoProps = {
  foundationInfo: MDXRemoteSerializeResult
}

export const FoundationInfo: FC<FoundationInfoProps> = ({ foundationInfo }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<JoinFormFieldValues>()

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
