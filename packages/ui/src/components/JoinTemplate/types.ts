import { MDXRemoteProps } from 'next-mdx-remote'

import { Job } from '@fc/types'

export type JoinTemplateProps = {
  title: string
  foundationInfo: MDXRemoteProps
  jobs: Job[]
}
