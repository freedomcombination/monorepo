import axios from 'axios'

import { API_URL } from '@fc/config'
import {
  StrapiCreateInput,
  StrapiEndpoint,
  StrapiLocale,
  StrapiModel,
  StrapiMutationResponse,
  StrapiUpdateInput,
} from '@fc/types'
import { generateFormData } from '@fc/utils'

type Method = 'post' | 'put' | 'delete' | 'localize'

type MutationBody =
  | StrapiCreateInput
  | StrapiUpdateInput
  | { data: StrapiCreateInput | StrapiUpdateInput }
  | FormData

type MutationParams<D> = {
  body?: D
  id?: number
  locale?: StrapiLocale
  method: Method
  token: string
  endpoint: StrapiEndpoint
  queryParameters?: string
}

// T is the type of the model to be returned
// D is the type of the data to be sent
export const mutation = async <
  T extends StrapiModel,
  D extends StrapiCreateInput | StrapiUpdateInput,
>({
  body,
  id,
  locale,
  method,
  token,
  endpoint,
  queryParameters,
}: MutationParams<D>) => {
  //  Throw an error if the id is not provided
  if (method !== 'post' && !id) {
    throw new Error(`Id is required for ${method} method`)
  }

  const config = {
    baseURL: `${API_URL}/api`,
    ...(token && {
      headers: { Authorization: `Bearer ${token}` },
    }),
  }

  if (method === 'localize') {
    // https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#creating-a-localization-for-an-existing-entry
    const response = await axios.post<T>(
      `${endpoint}/${id}/localizations`,
      { ...body, locale }, // TODO localization body doesn't seem to have data key. Double check this
      config,
    )

    return response.data || null
  }

  const queryParams = queryParameters ? `?${queryParameters}` : ''

  const requestUrl = id
    ? `${endpoint}/${id}${queryParams}`
    : `${endpoint}${queryParams}`

  if (method === 'delete') {
    const response = await axios[method]<StrapiMutationResponse<T>>(
      requestUrl,
      config,
    )

    return response.data?.data || null
  }

  //  Throw an error if the body is not provided
  if (!body) {
    throw new Error(`Body is required for ${method} method`)
  }

  const endpointsWithoutDataField: StrapiEndpoint[] = ['users', 'users/me']
  const hasBodyDataField = !endpointsWithoutDataField.includes(endpoint)

  let requestBody: MutationBody = hasBodyDataField
    ? ({ data: body } as { data: D })
    : body

  if (typeof window !== 'undefined') {
    const hasBodyFile = Object.values(body).some(
      // This might not work in Node.js environments. File is Web API only
      value => value instanceof File || value instanceof Blob,
    )

    if (hasBodyFile) {
      requestBody = generateFormData<D>(body, hasBodyDataField, endpoint)
    }
  }

  try {
    const response = await axios[method]<StrapiMutationResponse<T>>(
      requestUrl,
      requestBody,
      config,
    )

    return response.data?.data || null
  } catch (error: any) {
    console.error('Mutation error', error)

    throw new Error(error.response?.data?.message || error.message)
  }
}
