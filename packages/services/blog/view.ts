import { useMutation } from '@tanstack/react-query'
import { useTimeout } from 'react-use'
import { useLocalStorage } from 'usehooks-ts'

import { useAuthContext } from '@fc/context/auth'
import { Mutation } from '@fc/lib/mutation'
import type { Blog, BlogUpdateInput } from '@fc/types'

import { useGetBlogSlug } from './getBlogBySlug'

export const viewBlog = async (blog: Blog, token: string) => {
  const body = { views: (blog.views || 0) + 1, token }

  return Mutation.put<Blog, BlogUpdateInput>('blogs', blog.id, body, token)
}

export const useViewBlog = () => {
  const { token } = useAuthContext()
  const [isReady] = useTimeout(10 * 3000)

  const { data, refetch } = useGetBlogSlug()

  const blog = data?.data

  const [blogStorage, setBlogStorage] = useLocalStorage<number[]>(
    'view-blog',
    [],
  )

  const isViewed = blogStorage?.some(id => id === blog?.id)

  const { mutate } = useMutation({
    mutationKey: ['view-blog', blog?.id],
    mutationFn: (blog: Blog) => viewBlog(blog, token as string),
    onSuccess: () => {
      if (blog) {
        setBlogStorage([...(blogStorage || []), blog.id])
      }

      refetch()
    },
  })

  if (blog && !isViewed && isReady()) {
    mutate(blog)
  }
}
