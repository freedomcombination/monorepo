import type { StrapiEndpoint, StrapiModel, StrapiUpdateInput } from '@fc/types'

import { mutation } from './mutation'

export const putMutation = <T extends StrapiModel, D extends StrapiUpdateInput>(
  endpoint: StrapiEndpoint,
  id: number,
  body: D,
  token: string,
  isTest?: boolean,
) =>
  mutation<T, D>(
    {
      endpoint,
      method: 'put',
      id,
      body,
      token,
      queryParameters: 'populate[0]=localizations',
    },
    isTest,
  )
