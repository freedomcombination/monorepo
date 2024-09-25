import { MDXRemoteProps, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { UseFormReturn } from 'react-hook-form'
import { InferType } from 'yup'

import type { Job, StrapiLocale } from '@fc/types'

import { joinSchema } from './schema'

export type JoinTemplateProps = {
  title: string
  foundationInfo: MDXRemoteProps
  jobs: Job[]
  defaultJobs?: number[]
}

export type JoinFormFieldValues = InferType<ReturnType<typeof joinSchema>>

export type HeardFrom = {
  label: Record<StrapiLocale, string>
  value: string
  selected: boolean
}

export type UseFormStepsProps = {
  defaultJobs?: number[]
  selectedJobs: Job[]
  jobs: Job[]
}

export type UseFormStepsReturn = {
  description: string
  component: JSX.Element
  fields?: string[]
  requiresConfirmation?: boolean
  confirmationField?: string
}

export type JoinFormProviderProps = {
  children: React.ReactNode
  defaultJobs?: number[]
  foundationInfo: MDXRemoteSerializeResult
  isLoading?: boolean
  jobs: Job[]
  onSubmitHandler: (data: JoinFormFieldValues) => void
}

export type JoinFormContextValue = UseFormReturn<JoinFormFieldValues> & {
  activeStep: number
  defaultJobs?: number[]
  form: UseFormReturn<JoinFormFieldValues>
  foundationInfo: MDXRemoteSerializeResult
  isLoading?: boolean
  jobs: Job[]
  steps: UseFormStepsReturn[]
  handleNext: () => void
  handlePrev: () => void
  setActiveStep: (step: number) => void
  toggleChangingMedia: () => void
}

export type Option = {
  value: string
  label: string
}
