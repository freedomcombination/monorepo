import { Mutation } from '@fc/lib'
import {
  StrapiEndpoint,
  StrapiLocalizeInput,
  StrapiTranslatableModel,
} from '@fc/types'

import { getModelTranslation } from './deepl'

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
  const modelTranslations = await getModelTranslation(
    model as unknown as T,
    translatedFields,
    hasSlug,
  )

  const [firstTranslation, secondTranslation] = modelTranslations

  const firstTranslationResponse = await Mutation.localize<
    T,
    StrapiLocalizeInput
  >(endpoint, model.id, firstTranslation.locale, firstTranslation, token)

  const secondTranslationResponse = await Mutation.localize(
    endpoint,
    firstTranslationResponse?.id as number,
    secondTranslation.locale,
    secondTranslation,
    token,
  )

  return [firstTranslationResponse, secondTranslationResponse]
}
