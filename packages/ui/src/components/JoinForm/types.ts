import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { InferType } from 'yup'

import { Job, Platform, StrapiLocale } from '@fc/types'

import { joinSchema } from './schema'

export type JoinFormFieldValues = InferType<ReturnType<typeof joinSchema>>

export type JoinFormProps = {
  defaultJobs?: string[]
  foundationInfo: MDXRemoteSerializeResult
  foundationJobs?: Job[]
  isLoading: boolean
  platforms: Platform[]
  onSubmitHandler: (data: JoinFormFieldValues) => void
}

//  !!  {[key in StrapiLocale]?:string} for   optinal
export type HeardFrom = {
  label: Record<StrapiLocale, string>
  value: string
  selected: boolean
}
