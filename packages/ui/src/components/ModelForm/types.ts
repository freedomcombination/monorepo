import { ReactNode } from 'react'

import { ButtonProps, ModalProps } from '@chakra-ui/react'
import { TFunction } from 'i18next'
import {
  Control,
  FieldErrorsImpl,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import { AnyObjectSchema } from 'yup'

import {
  StrapiCollectionEndpoint,
  StrapiEndpoint,
  StrapiModel,
} from '@fc/types'
import { WSelectProps } from '../WSelect/types'

export type MentionSelectProps = {
  isEditing: boolean
  control: Control
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export type ModelCreateFormBodyProps<T extends StrapiModel> = {
  fields: FormFields<T>
  activeOption?: string
  formProps: UseFormReturn
  model?: Partial<T>
  isChangingMedia: boolean
  toggleChangingMedia: () => void
  t: TFunction<'common'>
}
