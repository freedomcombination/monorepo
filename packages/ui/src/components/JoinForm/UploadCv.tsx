import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

import { StrapiModel } from '@fc/types'

import { useJoinFormContext } from './useJoinFormContext'
import { ModelMedia } from '../ModelMedia'

export const UploadCv = () => {
  const {
    toggleChangingMedia,
    formState: { errors },
    setValue,
  } = useJoinFormContext()

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
