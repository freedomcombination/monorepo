import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { Blog } from '@fc/types'

export const getBlogBySlug = async (
  slug: string,
  token: string | null,
): Promise<Blog> => {
  const slugUrl = `${API_URL}/api/blogs/${slug}`
  const blogResponse = await axios.get<Blog>(slugUrl, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return blogResponse.data
}

export const useGetBlogSlug = () => {
  const { locale, query } = useRouter()
  const { token } = useAuthContext()

  return useQuery({
    queryKey: ['blog', locale, query.slug],
    queryFn: () => getBlogBySlug(query.slug as string, token),
  })
}
