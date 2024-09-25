import { useTranslation } from 'next-i18next'

import { Field } from '@fc/chakra'

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
    <Field
      required
      invalid={!!errors.cv?.message}
      errorText={errors.cv?.message as string}
      label={t('upload-cv')}
    >
      <ModelMedia<JoinFormFieldValues>
        isEditing={true}
        name={'cv'}
        setValue={setValue}
        isChangingMedia={true}
        toggleChangingMedia={toggleChangingMedia}
      />
    </Field>
  )
}
