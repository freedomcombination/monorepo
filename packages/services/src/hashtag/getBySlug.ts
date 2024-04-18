import { useQuery } from '@tanstack/react-query'
import { addDays, isPast } from 'date-fns'
import { useRouter } from 'next/router'

import { strapiRequest } from '@fc/lib'
import { Hashtag, HashtagReturnType, StrapiLocale, UploadFile } from '@fc/types'

export const getHashtagBySlug = async (
  locale: StrapiLocale,
  slug: string,
): Promise<HashtagReturnType | null> => {
  const response = await strapiRequest<Hashtag>({
    endpoint: 'hashtags',
    filters: { slug: { $eq: slug } },
    locale,
    populate: [
      'image',
      'mentions',
      'posts.image',
      'posts.caps',
      'localizations',
    ],
  })

  if (!response || !response?.data || !response.data.length) return null

  const hashtag = response.data[0]

  const hasPassed = isPast(addDays(new Date(hashtag.date as string), 1))
  const hasStarted = isPast(new Date(hashtag.date as string))
  const defaultHashtags = [hashtag.hashtagDefault, hashtag.hashtagExtra].filter(
    Boolean,
  ) as string[]

  const posts =
    hashtag.posts
      ?.filter(p => p.image || p.caps || p.imageParams)
      .map((p, index) => ({
        ...p,
        index,
        image:
          p.image || p.caps
            ? ({
                url:
                  p.image?.formats?.small?.url ||
                  p.image?.formats?.medium?.url ||
                  p.image?.url ||
                  p.caps?.url,
              } as UploadFile)
            : (p.imageParams as UploadFile),
      })) || []

  const localizations = (hashtag.localizations?.map(l => ({
    locale: l.locale,
    slug: l.slug,
  })) || []) as Hashtag[]

  return {
    ...hashtag,
    localizations,
    posts,
    hasPassed,
    hasStarted,
    defaultHashtags,
  }
}

export const useHashtag = () => {
  const {
    locale,
    query: { slug },
  } = useRouter()

  const hashtagQuery = useQuery({
    queryKey: ['hashtag', locale, slug],
    queryFn: () => getHashtagBySlug(locale as StrapiLocale, slug as string),
    staleTime: 1000 * 60,
  })

  return hashtagQuery.data as HashtagReturnType
}
