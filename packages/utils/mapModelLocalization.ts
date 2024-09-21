import { isEmpty } from 'lodash'

import {
  LocalizedModel,
  StrapiTranslatableModel,
  TranslatableModel,
} from '@fc/types'

export const mapModelLocalization = <T extends StrapiTranslatableModel>(
  model: TranslatableModel<T>,
  untranslatedFields?: (keyof TranslatableModel<T>)[],
) => {
  const locale = model?.locale
  const defaultLocalizedModel = {
    [locale]: model,
  } as LocalizedModel<T>

  const commonFields = untranslatedFields?.reduce(
    (acc, key) => {
      if (model[key]) {
        return {
          ...acc,
          [key]: model[key],
        }
      }

      return acc
    },
    {} as Partial<TranslatableModel<T>>,
  )

  const localizedModels =
    Array.isArray(model?.localizations) &&
    model.localizations?.reduce((acc, localizeModel) => {
      return {
        ...acc,
        [localizeModel.locale]: {
          ...localizeModel,
          ...commonFields,
        },
      }
    }, {} as TranslatableModel<T>)

  if (!isEmpty(localizedModels)) {
    return {
      ...defaultLocalizedModel,
      ...localizedModels,
    }
  }

  return defaultLocalizedModel
}
