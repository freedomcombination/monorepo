import {
  StrapiEndpoint,
  StrapiLocale,
  StrapiLocalizeInput,
  StrapiTranslatableModel,
} from '@fc/types'

import { mutation } from './mutation'

export const localizeMutation = <
  T extends StrapiTranslatableModel,
  D extends StrapiLocalizeInput,
>(
  endpoint: StrapiEndpoint,
  id: number,
  locale: StrapiLocale,
  body: D,
  token: string,
) =>
  mutation<T, D>({
    endpoint,
    method: 'localize',
    id,
    locale,
    body,
    token,
  })
