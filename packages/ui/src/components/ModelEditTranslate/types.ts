import { ReactNode } from 'react'

import { AnyObjectSchema } from 'yup'

import { StrapiTranslatableModel } from '@fc/types'

import { FormFields, ModelEditFormProps } from '../ModelForm'

export type ModelEditTranslateProps<T extends StrapiTranslatableModel> = Omit<
  ModelEditFormProps<T>,
  'model'
> & {
  id: number
  children?: ReactNode
  fields: FormFields<T>
  schema: AnyObjectSchema
}
