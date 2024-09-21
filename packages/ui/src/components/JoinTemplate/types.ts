import { Platform } from '@fc/types'
import { MDXRemoteProps } from 'next-mdx-remote'

export type JoinTemplateProps = {
  title: string
  foundationInfo: MDXRemoteProps
  platforms: Platform[]
}
