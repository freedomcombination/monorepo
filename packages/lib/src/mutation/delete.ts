import { APIRequestContext } from '@playwright/test'

import { StrapiEndpoint, StrapiModel } from '@fc/types'

import { mutation } from './mutation'

export const deleteMutation = <T extends StrapiModel>(
  endpoint: StrapiEndpoint,
  id: number,
  token: string,
  fetcher?: APIRequestContext,
) => mutation<T, any>({ endpoint, method: 'delete', id, token }, fetcher)
