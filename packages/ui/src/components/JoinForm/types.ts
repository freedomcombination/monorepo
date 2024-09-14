import { InferType } from 'yup'

import { Platform, StrapiLocale, Job, Foundation } from '@fc/types'

import { joinSchema } from './schema'

export type JoinFormFieldValues = InferType<ReturnType<typeof joinSchema>>

export type JoinFormProps = {
  platforms: Platform[]
  foundationJobs: Job[]
  isLoading: boolean
  onSubmitHandler: (data: JoinFormFieldValues) => void
  foundation: Foundation[]
}

//  !!  {[key in StrapiLocale]?:string} for   optinal
export type HeardFrom = {
  label: Record<StrapiLocale, string>
  value: string
  selected: boolean
}
