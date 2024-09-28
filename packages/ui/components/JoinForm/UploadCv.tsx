import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { JoinFormFieldValues } from './types'
import { useJoinFormContext } from './useJoinFormContext'
import { ModelMedia } from '../ModelMedia'

export const UploadCv = () => {
  const { t } = useTranslation()
  const {
    toggleChangingMedia,
    formState: { errors },
    setValue,
  } = useJoinFormContext()

  return (
    <FormControl isRequired={true} isInvalid={!!errors.cv?.message}>
      <FormLabel fontWeight={600} fontSize={'sm'} textTransform={'capitalize'}>
        {t('upload-cv')}
      </FormLabel>
      <ModelMedia<JoinFormFieldValues>
        isEditing={true}
        name={'cv'}
        setValue={setValue}
        isChangingMedia={true}
        toggleChangingMedia={toggleChangingMedia}
      />
      <FormErrorMessage>{errors.cv?.message as string}</FormErrorMessage>
    </FormControl>
  )
}
