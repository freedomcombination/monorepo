import { GetStaticPropsContext } from 'next/types'
import { serialize } from 'next-mdx-remote/serialize'

import { StrapiLocale } from '@wsvvrijheid/types'

import { getPlatformBySlug } from './getBySlug'

export const getPlatformStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  const platform = await getPlatformBySlug(slug)

  if (!platform) return { notFound: true }

  const platformData = {
    title: {
      en: platform.name_en,
      nl: platform.name_nl,
      tr: platform.name_tr,
    },
    description: {
      en: platform.description_en,
      nl: platform.description_nl,
      tr: platform.description_tr,
    },
    content: {
      en: platform.content_en,
      nl: platform.content_nl,
      tr: platform.content_tr,
    },
  }

  const title = platformData.title[locale as StrapiLocale]
  const description = platformData.description[locale as StrapiLocale]
  const content = platformData.content[locale as StrapiLocale]
  const image = platform.image
  const link = platform.link

  const seo = {
    title,
    description,
    content,
  }

  const source = await serialize(content || '')

  return {
    seo,
    image,
    link,
    source,
    slugs: {
      en: platform.slug,
      nl: platform.slug,
      tr: platform.slug,
    },
  }
}
