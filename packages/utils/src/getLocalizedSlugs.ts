import { StrapiLocale, StrapiTranslatableModel } from '@fc/types'

export const getLocalizedSlugs = <T extends StrapiTranslatableModel>(
  model: T,
  locale: StrapiLocale,
) => {
  const localizations = (model.localizations || []) as T[]

  if (!localizations?.length || !(model as any).slug) {
    return { en: '', nl: '', tr: '' }
  }

  const slugs =
    localizations.reduce(
      (acc, localization) => {
        return {
          ...acc,
          [localization.locale]: (localization as any).slug,
        }
      },
      { en: '', nl: '', tr: '' },
    ) || {}

  return {
    ...slugs,
    [locale]: (model as any).slug,
  }
}
