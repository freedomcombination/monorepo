import { NextSeoProps } from 'next-seo'

import { SITE_URL, TWITTER_HANDLE } from '@fc/config/constants'
import { endpointsWithLocalizedTitle } from '@fc/services/common/urls'
import type {
  Art,
  Blog,
  Hashtag,
  Platform,
  Post,
  StrapiEndpoint,
  StrapiLocale,
  StrapiSeoModel,
  UploadFile,
} from '@fc/types'

import { getItemLink } from './getItemLink'
import { getMediaUrl } from './getMediaUrl'
import { getOgImageSrc } from './getOgImageSrc'
import { mapHashtagToOgParams } from './mapHashtagToOgParams'

export const getPageSeo = (
  data: StrapiSeoModel,
  endpoint: StrapiEndpoint,
  locale: StrapiLocale,
  hasCaps?: boolean,
): NextSeoProps => {
  const url = getItemLink(data as Hashtag | Post, endpoint, true) ?? ''

  const page = data as Hashtag
  const post = data as Post
  const blog = data as Blog
  const platform = data as Platform
  const art = data as Art

  const hasLocalizedName = endpointsWithLocalizedTitle.includes(endpoint)
  const localizedTitle = hasLocalizedName
    ? platform[`name_${locale}`] || art[`title_${locale}`]
    : ''

  const title = localizedTitle || page.title || post.hashtag?.title || ''
  const description = page.description ?? post.description ?? ''
  let image = (art.image?.[0] || blog.image) as UploadFile | string | undefined

  if (hasCaps) {
    const ogParams = mapHashtagToOgParams(page)

    image = SITE_URL + getOgImageSrc(ogParams)
  }

  const images = []

  if (image) {
    const imageObj = {
      url: getMediaUrl(image),
      secureUrl: getMediaUrl(image),
      alt: title,
    }

    if (typeof image === 'string') {
      images.push(imageObj)
    } else {
      images.push({
        ...imageObj,
        type: image.mime,
        width: image.width,
        height: image.height,
      })
    }
  }

  return {
    title,
    description,
    canonical: url,
    twitter: {
      cardType: 'summary_large_image',
      site: TWITTER_HANDLE,
      handle: TWITTER_HANDLE,
    },
    openGraph: {
      title,
      description,
      url,
      ...(image && { images }),
      ...(endpoint === 'posts' && {
        type: 'article',
        article: {
          publishedTime: blog.publishedAt as string,
          modifiedTime: blog.updatedAt as string,
          authors: [blog.author?.name || blog.author?.email || ''],
        },
      }),
    },
  }
}
