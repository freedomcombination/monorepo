import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { useAuthContext } from '@fc/context/auth'
import type { Blog } from '@fc/types'

import { strapiRequest } from '../common/request'

export const getBlogBySlug = async (slug: string, token: string | null) => {
  return strapiRequest<Blog>({
    endpoint: 'blogs',
    // Blog findOne endpoint can accept either an id or a slug
    id: slug as unknown as number,
    ...(token && { token }),
  })
}

export const useGetBlogSlug = () => {
  const { locale, query } = useRouter()
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['blog', locale, query.slug],
    queryFn: () => getBlogBySlug(query.slug as string, token),
  })
}
