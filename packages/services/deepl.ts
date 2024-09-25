import slugify from '@sindresorhus/slugify'
import axios from 'axios'
import removeMarkdown from 'remove-markdown'

import type { StrapiLocale, StrapiTranslatableModel } from '@fc/types'

export const translateContent = async (
  content: string,
  locale: StrapiLocale,
  isMarkdown?: boolean,
) => {
  let paragraphs = [] as string[]

  if (isMarkdown) {
    try {
      // TODO Add proper way of removing html tags including self closing tags
      paragraphs = content
        .replace(/<.*?>(.*?)<\/.*?>/g, '')
        .replace(/<.*?>(.*?)\/>/g, '')
        // Split text into paragraphs
        .split(/\r?\n\r?\n/)

      paragraphs = paragraphs.map(p => removeMarkdown(p))
    } catch (error) {
      console.error('Error removing markdown', error)
    }
  }

  if (paragraphs[0]) {
    const translatedParagraphs = await Promise.all(
      paragraphs.map(async text => {
        const translation = await axios.post('/api/translate', {
          text,
          locale,
        })

        return translation.data
      }),
    )

    return translatedParagraphs.join('\n\n')
  }

  try {
    const response = await axios.post('/api/translate', {
      text: content,
      locale,
    })

    return response.data
  } catch (error) {
    console.error(error)

    console.error('Error translating', content)

    return `**NOT_TRANSLATED** ${content}`
  }
}

export const translateModel = async <
  T extends StrapiTranslatableModel & { slug?: string },
>(
  model: T,
  translatedFields: (keyof T)[],
  hasSlug = true,
) => {
  const translatedData = [] as T[]

  const localesToBeTranslated = ['en', 'nl', 'tr'].filter(
    locale => locale !== model.locale,
  ) as StrapiLocale[]

  const fieldsToBeTranslated = translatedFields.filter(
    field => typeof field === 'string',
  )

  await Promise.all(
    localesToBeTranslated.map(async locale => {
      const translatedModel = { locale } as T

      await Promise.all(
        fieldsToBeTranslated.map(async key => {
          const value = model[key as keyof T]

          const translation = await translateContent(
            value as string,
            locale,
            key === 'content',
          )

          translatedModel[key as keyof T] = translation

          if (key === 'title' && hasSlug) {
            let slug = slugify(translation as string)

            const isSlugTaken =
              slug === model.slug || translatedData.some(t => t.slug === slug)

            if (isSlugTaken) {
              slug = `${slug}-${locale}`
            }

            translatedModel['slug'] = slug
          }
        }),
      )

      translatedData.push(translatedModel)
    }),
  )

  return translatedData
}
