import { MDXRemoteProps } from 'next-mdx-remote'

import { Platform } from '@fc/types'

export type JoinTemplateProps = {
  title: string
  foundationInfo: MDXRemoteProps
  platforms: Platform[]
}
