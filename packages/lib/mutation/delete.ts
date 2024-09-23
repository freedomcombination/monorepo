import type { StrapiEndpoint, StrapiModel } from '@fc/types'

import { mutation } from './mutation'

export const deleteMutation = <T extends StrapiModel>(
  endpoint: StrapiEndpoint,
  id: number,
  token: string,
  isTest?: boolean,
) => mutation<T>({ endpoint, method: 'delete', id, token }, isTest)
