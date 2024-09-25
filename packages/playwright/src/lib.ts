import { mutation } from '@fc/services/common/mutation'
import { strapiRequest } from '@fc/services/common/strapiRequest'
import {
  StrapiCreateInput,
  StrapiEndpoint,
  StrapiModel,
  StrapiUpdateInput,
} from '@fc/types'

export { mutation } from '@fc/services/common/mutation'

export const apiDeleteMutation = <T extends StrapiModel>(
  endpoint: StrapiEndpoint,
  id: number,
  token: string,
  isTest?: boolean,
) => mutation<T>({ endpoint, method: 'delete', id, token }, isTest)

export const apiPostMutation = <
  T extends StrapiModel,
  D extends StrapiCreateInput,
>(
  endpoint: StrapiEndpoint,
  body: D,
  token: string,
  isTest?: boolean,
) => mutation<T, D>({ endpoint, method: 'post', body, token }, isTest)

export const apiPutMutation = <
  T extends StrapiModel,
  D extends StrapiUpdateInput,
>(
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

export const apiGetRequest = strapiRequest
