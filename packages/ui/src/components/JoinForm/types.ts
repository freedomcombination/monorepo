import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { MDXRemoteProps } from 'next-mdx-remote'
import { InferType } from 'yup'

import { Job, StrapiLocale } from '@fc/types'

import { joinSchema } from './schema'

export type JoinTemplateProps = {
  title: string
  foundationInfo: MDXRemoteProps
  jobs: Job[]
  defaultJobs?: number[]
}

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
  foundationInfo: MDXRemoteSerializeResult
  isLoading?: boolean
  jobs: Job[]
  toggleChangingMedia: () => void
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
}
