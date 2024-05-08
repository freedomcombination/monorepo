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

import { WSelectProps } from '../../components'

export type MentionSelectProps = {
  isEditing: boolean
  control: Control
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

type FormTextFields = {
  type?:
    | 'boolean'
    | 'date'
    | 'datetime-local'
    | 'file'
    | 'markdown'
    | 'number-input'
    | 'text'
    | 'textarea'
    | 'mediaUrl'
}

type FormSelectFields = {
  type: 'select'
  isMulti?: boolean
  endpoint: StrapiCollectionEndpoint
  populate?: string | string[]
  options?: Option[]
}

export type FormCommonFields<T extends StrapiModel> = {
  name: keyof T
  label?: string
  isRequired?: boolean
  group?: { value: string; label?: string; name: string }
  blockEdit?: boolean
}

export type FormFields<T extends StrapiModel> = Array<
  | (FormTextFields & FormCommonFields<T>)
  | (FormSelectFields & FormCommonFields<T>)
>

export type ModelCreateFormProps<T extends StrapiModel> = {
  endpoint: StrapiEndpoint
  options: Option[]
  fields: FormFields<T>
  model?: Partial<T>
  schema: AnyObjectSchema
  buttonProps?: ButtonProps
  hideLanguageSwitcher?: boolean
  shouldPublish?: boolean
  initialValues?: Partial<T>
  onSuccess?: () => void
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

export type ModelEditFormProps<T extends StrapiModel> = {
  endpoint: StrapiEndpoint
  model: T
  translatedFields?: (keyof T)[]
  hideLanguageSwitcher?: boolean
  noColumns?: boolean
  defaultIsEditing?: boolean
  onSuccess: () => void
  onClose?: () => void
  onCancel?: () => void
}

export type ModelEditModalProps<T extends StrapiModel> = Omit<
  ModalProps,
  'id' | 'children'
> &
  Omit<ModelEditFormProps<T>, 'model'> & {
    title: string
    id: number
    isOpen: boolean
    isFullHeight?: boolean
    onClose: () => void
    maxW?: string
    children?: ReactNode
  }

export type ModelSelectProps = WSelectProps<FieldValues> & {
  endpoint: StrapiCollectionEndpoint
  populate?: string | string[]
  control: Control
  tooltip?: string
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export type Option = { value: string | number; label: string }
