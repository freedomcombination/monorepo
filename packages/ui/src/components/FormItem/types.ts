import { ReactNode } from 'react'

import { InputProps } from '@chakra-ui/react'
import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form'

export type FormItemProps<T extends FieldValues> = InputProps & {
  name: Path<T>
  label?: string
  placeholder?: string
  helperText?: string
  leftElement?: ReactNode
  rightElement?: ReactNode
  hideLabel?: boolean
  tooltip?: string
  errors: Partial<FieldErrorsImpl<T>>
  register: UseFormRegister<T>
}
