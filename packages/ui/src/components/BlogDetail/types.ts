import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Blog } from '@fc/types'

export type BlogDetailProps = {
  link: string
  source: MDXRemoteSerializeResult
  authorBlogs: Blog[]
}
