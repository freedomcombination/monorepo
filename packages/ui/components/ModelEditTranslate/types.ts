import { ReactNode } from 'react'

import { AnyObjectSchema } from 'yup'

import type { FormFields, StrapiTranslatableModel } from '@fc/types'

import { ModelEditFormProps } from '../ModelEditForm'

export type ModelEditTranslateProps<T extends StrapiTranslatableModel> = Omit<
  ModelEditFormProps<T>,
  'model'
> & {
  id: number
  children?: ReactNode
  fields: FormFields<T>
  schema: AnyObjectSchema
}
