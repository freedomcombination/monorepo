import { APIRequestContext } from '@playwright/test'

import { StrapiCreateInput, StrapiEndpoint, StrapiModel } from '@fc/types'

import { mutation } from './mutation'

export const postMutation = <
  T extends StrapiModel,
  D extends StrapiCreateInput,
>(
  endpoint: StrapiEndpoint,
  body: D,
  token: string,
  fetcher?: APIRequestContext,
) => mutation<T, D>({ endpoint, method: 'post', body, token }, fetcher)
