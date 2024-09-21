import { MDXRemoteSerializeResult } from 'next-mdx-remote'
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
