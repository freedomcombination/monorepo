import { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import type { StrapiCollectionEndpoint } from '@fc/types'

import { WSelectProps } from '../WSelect/types'

type ModelSelectBaseProps = Omit<WSelectProps<FieldValues>, 'options'> & {
  control: Control
  tooltip?: string
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export type ModelDynamicSelectProps = ModelSelectBaseProps & {
  endpoint: StrapiCollectionEndpoint
  populate?: string | string[]
}

export type ModelStaticSelectProps = ModelSelectBaseProps & {
  options: string[]
}

export type ModelSelectProps = ModelDynamicSelectProps | ModelStaticSelectProps

export type Option = { value: string | number; label: string }
