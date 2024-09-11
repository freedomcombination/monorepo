import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { useAuthContext } from '@fc/context'
import { strapiRequest } from '@fc/lib'
import { Blog, StrapiLocale } from '@fc/types'

export const getBlogs = async (locale: StrapiLocale, token: string | null) => {
  const response = await strapiRequest<Blog>({
    endpoint: 'blogs',
    locale,
    sort: ['publishedAt:desc'],
    ...(token && { token }),
  })

  return response?.data || []
}
export const getCategoriesBlogs = async (
  locale: StrapiLocale,
  categories: string[],
  token: string | null,
) => {
  const filters = {
    categories: {
      slug: {
        $in: categories,
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

  console.log('other blogs', response?.data)

  return response?.data || []
}

export const useGetCategoriesBlogs = (categories: string[]) => {
  const { locale } = useRouter()
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['blogs', locale, categories],
    queryFn: () =>
      getCategoriesBlogs(
        locale as StrapiLocale,
        categories || [],
        token as string,
      ),
  })
}

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

export const useGetBlogs = () => {
  const { locale } = useRouter()
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale as StrapiLocale, token),
  })
}

export const useGetAuthorBlogs = () => {
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
