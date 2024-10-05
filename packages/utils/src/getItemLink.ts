import { SITE_URL } from '@fc/config'
import {
  Post,
  RecommendedTopic,
  RecommendedTweet,
  StrapiEndpoint,
  StrapiSeoModel,
  StrapiTranslatableModel,
} from '@fc/types'

import { getMainPageLink } from './getMainPageLink'

export const getItemLink = (
  item: StrapiSeoModel,
  endpoint: StrapiEndpoint,
  isAbsolute?: boolean,
): string | null => {
  const post = item as Post
  const model = item as Exclude<
    StrapiSeoModel,
    Post | RecommendedTopic | RecommendedTweet
  >
  const modelWithLocale = item as StrapiTranslatableModel

  let itemUrl: string | null

  const localeSlug = modelWithLocale?.locale ? `/${modelWithLocale.locale}` : ''

  if (!item) {
    console.error('Missing item:', endpoint, item)

    return null
  }

  if (post?.hashtag?.slug) {
    itemUrl = `${localeSlug}/${getMainPageLink('hashtags')}/${
      post.hashtag?.slug
    }?id=${post.id}`
  } else if (model.slug) {
    itemUrl = `${localeSlug}/${getMainPageLink(endpoint)}/${model?.slug}`
  } else {
    console.error('Missing slug for post:', endpoint, model)

    return null
  }

  return isAbsolute ? SITE_URL + itemUrl : itemUrl
}
