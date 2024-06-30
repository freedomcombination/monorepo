import { Merge } from 'type-fest'

import {
  StrapiLocale,
  StrapiTranslatableModel,
  TranslatableModel,
} from '@fc/types'

export type TranslateModalProps<T extends StrapiTranslatableModel> = {
  isOpen: boolean
  onClose: () => void
  model: TranslatableModel<T>
}

export type TranslationKey = [StrapiLocale, StrapiLocale]

export type TranslateAccordionItemProps<T extends StrapiTranslatableModel> =
  Merge<
    TranslatableModel<T>,
    {
      missingTranslations?: StrapiLocale[]
      handleTranslate: (key: TranslationKey) => void
    }
  >

export type LocalizedModel<T extends StrapiTranslatableModel> = Record<
  StrapiLocale,
  TranslatableModel<T>
>

export type TranslateFormProps<T extends StrapiTranslatableModel> = {
  translationKey: TranslationKey
  localizedModels: LocalizedModel<T>
}
