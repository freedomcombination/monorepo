import type { Blog } from '@fc/types'

export type BlogCardProps = {
  post: Blog
  isFeatured?: boolean
  onClick?: () => void
}
