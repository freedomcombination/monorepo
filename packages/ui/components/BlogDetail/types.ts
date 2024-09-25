import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import type { Blog } from '@fc/types'

export type BlogDetailProps = {
  link: string
  source: MDXRemoteSerializeResult
  authorBlogs: Blog[]
}
