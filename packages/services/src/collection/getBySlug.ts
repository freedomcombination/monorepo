import { strapiRequest } from '@fc/lib'
import { Collection, StrapiLocale } from '@fc/types'

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
