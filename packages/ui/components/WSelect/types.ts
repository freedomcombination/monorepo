import { SelectRootProps } from '@chakra-ui/react'
import { Control, FieldValues } from 'react-hook-form'

import { FormItemProps } from '../FormItem'

export type SelectOption = {
  label: string
  value: string
}

export type WSelectProps<T extends FieldValues> = {
  control: Control<T>
  options: SelectOption[]
} & Omit<FormItemProps<T>, 'register' | 'leftElement'> &
  Omit<SelectRootProps, 'items' | 'collection'>
