import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import type { UploadFile } from '@fc/types'

export type PlatformTemplateProps = {
  seo: NextSeoProps
  source: MDXRemoteSerializeResult
  image: UploadFile | string
  link: string
}
