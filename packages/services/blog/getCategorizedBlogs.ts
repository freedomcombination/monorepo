import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { BLOG_CATEGORIES } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import { Blog, StrapiLocale } from '@fc/types'

import { strapiRequest } from '../common/strapiRequest'

export const getCategorizedBlogs = async (
  locale: StrapiLocale,
  token: string | null,
) => {
  const filters = {
    categories: {
      slug: {
        $in: Object.values(BLOG_CATEGORIES),
      },
    },
  }
  const response = await strapiRequest<Blog>({
    endpoint: 'blogs',
    locale,
    filters,
    sort: ['publishedAt:desc'],
    ...(token && { token }),
  })

  return response?.data || []
}

export const useGetCategorizedBlogs = () => {
  const { locale } = useRouter()
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['categorized-blogs', locale],
    queryFn: () => getCategorizedBlogs(locale as StrapiLocale, token as string),
  })
}
