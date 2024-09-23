import { NextSeoProps } from 'next-seo'

import type { Blog } from '@fc/types'

export type BlogTemplateProps = {
  seo: NextSeoProps
  blogs: Blog[]
}
