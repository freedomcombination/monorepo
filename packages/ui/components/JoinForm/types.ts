import { BlocksContent } from '@strapi/blocks-react-renderer'
import { UseFormReturn } from 'react-hook-form'
import { InferType } from 'yup'

import type { Job, StrapiLocale } from '@fc/types'

import { useJoinFormSchema } from './schema'

export type JoinTemplateProps = {
  title: string
  foundationInfo: BlocksContent | null
  jobs: Job[]
  defaultJobs?: number[]
}

export type JoinFormFieldValues = InferType<
  ReturnType<typeof useJoinFormSchema>
>

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
  title: string
  description?: string
  component: JSX.Element
  fields?: string[]
  requiresConfirmation?: boolean
  confirmationField?: string
}

export type JoinFormProviderProps = {
  children: React.ReactNode
  defaultJobs?: number[]
  foundationInfo: BlocksContent | null
  isLoading?: boolean
  jobs: Job[]
  onSubmitHandler: (data: JoinFormFieldValues) => void
}

export type JoinFormContextValue = UseFormReturn<JoinFormFieldValues> & {
  activeStep: number
  defaultJobs?: number[]
  form: UseFormReturn<JoinFormFieldValues>
  foundationInfo: BlocksContent | null
  isLoading?: boolean
  jobs: Job[]
  selectedJobs: Job[]
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
