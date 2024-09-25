import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { useAuthContext } from '@fc/context/auth'
import type { Blog, StrapiLocale } from '@fc/types'

import { strapiRequest } from '../common/strapiRequest'

export const getAuthorBlogs = async (
  locale: StrapiLocale,
  authorID: number,
  blogId: number,
  token?: string | null,
) => {
  const response = await strapiRequest<Blog>({
    endpoint: 'blogs',
    filters: {
      $and: [{ author: { id: { $eq: authorID } } }, { id: { $ne: blogId } }],
    },
    pageSize: 2,
    sort: ['publishedAt:desc'],
    locale,
    ...(token && { token }),
  })

  return response?.data || []
}

export const useAuthorBlogs = () => {
  const { locale } = useRouter()
  const { token, profile } = useAuthContext()

  return useQuery({
    queryKey: ['author-blogs', locale],
    queryFn: async () => {
      if (!profile || !token) return []

      const response = await strapiRequest<Blog>({
        endpoint: 'blogs',
        filters: {
          author: { id: { $eq: profile.id } },
        },
        sort: ['publishedAt:desc'],
        locale: locale as StrapiLocale,
        token,
      })

      return response?.data || []
    },
  })
}
