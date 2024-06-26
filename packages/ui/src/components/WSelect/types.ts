import { GroupBase, Props as SelectProps } from 'chakra-react-select'
import { Control, FieldValues } from 'react-hook-form'

import { FormItemProps } from '../FormItem'

export type SelectOption = {
  label: string
  value: string
}

export type WSelectProps<T extends FieldValues> = {
  control: Control<T>
} & Omit<FormItemProps<T>, 'register' | 'leftElement'> &
  SelectProps<SelectOption, boolean, GroupBase<SelectOption>>
