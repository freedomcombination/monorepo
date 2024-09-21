import { NextSeoProps } from 'next-seo'

import { Blog } from '@fc/types'

export type BlogTemplateProps = {
  seo: NextSeoProps
  blogs: Blog[]
}
