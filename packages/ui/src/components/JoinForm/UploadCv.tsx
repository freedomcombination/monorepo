import React from 'react'

import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import { StrapiModel } from '@fc/types'

import { JoinFormFieldValues } from './types'
import { useJoinFormContext } from './useJoinFormContext'
import { ModelMedia } from '../ModelMedia'

export const UploadCv = () => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<JoinFormFieldValues>()
  const { toggleChangingMedia } = useJoinFormContext()

  return (
    <FormControl isRequired={true} isInvalid={!!errors.cv?.message}>
      <FormLabel fontWeight={600} fontSize={'sm'} textTransform={'capitalize'}>
        Please Upload your CV
      </FormLabel>
      <ModelMedia
        model={'Job' as unknown as StrapiModel}
        isEditing={true}
        name={'cv'}
        setValue={setValue}
        isChangingMedia={true}
        toggleChangingMedia={toggleChangingMedia}
      />
      <FormErrorMessage>{errors.cv?.message}</FormErrorMessage>
    </FormControl>
  )
}
