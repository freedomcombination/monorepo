import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import type { Platform } from '@fc/types'

import { strapiRequest } from '../common/strapiRequest'

export const getPlatformBySlug = async (slug: string) => {
  const response = await strapiRequest<Platform>({
    endpoint: 'platforms',
    filters: { slug: { $eq: slug } },
  })

  return response?.data?.[0] || null
}

export const usePlatformBySlug = () => {
  const {
    query: { slug },
  } = useRouter()

  return useQuery({
    queryKey: ['platform', slug],
    queryFn: () => getPlatformBySlug(slug as string),
  })
}
