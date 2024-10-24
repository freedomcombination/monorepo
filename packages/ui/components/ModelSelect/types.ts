import { SelectRootProps } from '@chakra-ui/react'
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
  collection: SelectRootProps['collection']
}

export type ModelStaticSelectProps = ModelSelectBaseProps & {
  options: string[]
  collection: SelectRootProps['collection']
}

export type ModelSelectProps =
  | Omit<ModelDynamicSelectProps, 'collection'>
  | Omit<ModelStaticSelectProps, 'collection'>

export type Option = { value: string | number; label: string }
