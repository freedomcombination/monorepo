import type { Collection, StrapiLocale } from '@fc/types'

import { strapiRequest } from '../common/request'

export const getCollectionBySlug = async (
  locale: StrapiLocale,
  slug: string,
) => {
  const response = await strapiRequest<Collection>({
    endpoint: 'collections',
    filters: { slug: { $eq: slug } },
    populate: ['localizations', 'image', 'arts.image', 'arts.artist'],
    locale,
  })

  return response?.data?.[0] || null
}
