import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { InferType } from 'yup'

import { Job, StrapiLocale } from '@fc/types'

import { joinSchema } from './schema'

export type JoinFormFieldValues = InferType<ReturnType<typeof joinSchema>>

export type JoinFormProps = {
  defaultJobs?: string[]
  isLoading?: boolean
  foundationInfo: MDXRemoteSerializeResult
  jobs: Job[]
  onSubmitHandler: (data: JoinFormFieldValues) => void
}

//  !!  {[key in StrapiLocale]?:string} for   optinal
export type HeardFrom = {
  label: Record<StrapiLocale, string>
  value: string
  selected: boolean
}

export type UseFormStepsProps = {
  defaultJobs?: string[]
  errors: FieldErrors<JoinFormFieldValues>
  foundationInfo: MDXRemoteSerializeResult
  isLoading?: boolean
  jobs: Job[]
  selectedFields: JoinFormFieldValues
  getData: () => JoinFormFieldValues
  register: UseFormRegister<JoinFormFieldValues>
  setValue: UseFormSetValue<JoinFormFieldValues>
  toggleChangingMedia: () => void
  watch: UseFormWatch<JoinFormFieldValues>
}

export type UseFormStepsReturn = {
  description: string
  component: JSX.Element
  fields?: string[]
  requiresConfirmation?: boolean
  confirmationField?: string
}
