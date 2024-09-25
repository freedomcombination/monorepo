import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import type { Course } from '@fc/types'

import { strapiRequest } from '../common/request'

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  const response = await strapiRequest<Course>({
    endpoint: 'courses',
    filters: { slug: { $eq: slug } },
  })

  if (!response || !response?.data || !response.data.length) return null

  const course = response.data[0] || null

  return course
}

export const useCourseBySlug = () => {
  const {
    query: { slug },
  } = useRouter()

  return useQuery({
    queryKey: ['hashtag', slug],
    queryFn: () => getCourseBySlug(slug as string),
  })
}
