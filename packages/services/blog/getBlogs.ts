import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { useAuthContext } from '@fc/context/auth'
import type { Blog, StrapiLocale } from '@fc/types'

import { strapiRequest } from '../common/request'

export const getBlogs = async (locale: StrapiLocale, token: string | null) => {
  const response = await strapiRequest<Blog>({
    endpoint: 'blogs',
    locale,
    sort: ['publishedAt:desc'],
    ...(token && { token }),
  })

  return response?.data || []
}

export const useBlogs = () => {
  const { locale } = useRouter()
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale as StrapiLocale, token),
  })
}
