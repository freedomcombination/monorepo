import { mutation } from '@fc/services/common/mutation'
import type {
  StrapiEndpoint,
  StrapiLocalizeInput,
  StrapiTranslatableModel,
} from '@fc/types'

import { translateModel } from './deepl'

type CreateLocalizationsArgs<T extends StrapiTranslatableModel> = {
  model: T
  translatedFields: (keyof T)[]
  endpoint: StrapiEndpoint
  token: string
  hasSlug?: boolean
}

export const createLocalizations = async <T extends StrapiTranslatableModel>({
  model,
  translatedFields,
  endpoint,
  token,
  hasSlug = true,
}: CreateLocalizationsArgs<T>) => {
  const modelTranslations = await translateModel(
    model as unknown as T,
    translatedFields,
    hasSlug,
  )

  const [firstTranslation, secondTranslation] = modelTranslations

  const firstTranslationResponse = await mutation<T, StrapiLocalizeInput>({
    endpoint,
    method: 'localize',
    id: model.id,
    locale: firstTranslation.locale,
    body: firstTranslation,
    token,
  })

  const secondTranslationResponse = await mutation<T, StrapiLocalizeInput>({
    endpoint,
    method: 'localize',
    id: firstTranslationResponse?.data?.id as number,
    locale: secondTranslation.locale,
    body: secondTranslation,
    token,
  })

  return [firstTranslationResponse, secondTranslationResponse]
}
