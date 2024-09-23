import { strapiRequest } from '@fc/lib/request'
import type { Platform } from '@fc/types'

export const getPlatformBySlug = async (slug: string) => {
  const response = await strapiRequest<Platform>({
    endpoint: 'platforms',
    filters: { slug: { $eq: slug } },
  })

  return response?.data?.[0] || null
}
