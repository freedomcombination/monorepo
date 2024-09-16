import axios, { AxiosRequestConfig } from 'axios'

import {
  StrapiCreateInput,
  StrapiEndpoint,
  StrapiLocale,
  StrapiModel,
  StrapiMutationResponse,
  StrapiUpdateInput,
} from '@fc/types'

import { API_URL, endpointsWithoutDataField } from '../urls'
import { generateFormData } from '../utils'

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
  D extends StrapiCreateInput | StrapiUpdateInput = StrapiCreateInput,
>(
  {
    body,
    id,
    locale,
    method,
    token,
    endpoint,
    queryParameters,
  }: MutationParams<D>,
  isTest?: boolean,
) => {
  try {
    let status: number = 200
    let statusText: string = 'OK'
    let hasBodyFile = false

    //  Throw an error if the id is not provided
    if (method !== 'post' && !id) {
      const errorMessage = `Id is required for ${method} method`
      if (isTest) {
        return {
          data: { error: errorMessage } as unknown as T,
          meta: {},
          status: 400,
          statusText: 'Bad Request',
        } as StrapiMutationResponse<T>
      }

      throw new Error(errorMessage)
    }

    const config: AxiosRequestConfig<D> = {
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

      status = response.status
      statusText = response.statusText

      return {
        ...response,
        meta: {},
        status,
        statusText,
      } as StrapiMutationResponse<T>
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

      status = response.status
      statusText = response.statusText

      return {
        ...response.data,
        status,
        statusText,
      } as StrapiMutationResponse<T>
    }

    //  Throw an error if the body is not provided
    if (!body) {
      const errorMessage = `Body is required for ${method} method`

      if (isTest) {
        return {
          data: { error: errorMessage } as unknown as T,
          meta: {},
          status: 400,
          statusText: 'Bad Request',
        } as StrapiMutationResponse<T>
      }

      throw new Error(errorMessage)
    }

    const hasBodyDataField = !endpointsWithoutDataField.includes(endpoint)

    Object.entries(body).forEach(([key, value]) => {
      if (value instanceof Date) {
        const utcDate = new Date(
          value.getTime() - value.getTimezoneOffset() * 60000,
        ).toISOString()
        ;(body as any)[key] = utcDate
      }
    })

    let requestBody: MutationBody = hasBodyDataField
      ? ({ data: body } as { data: D })
      : body

    if (typeof window !== 'undefined') {
      hasBodyFile = Object.values(body).some(
        // This might not work in Node.js environments. File is Web API only
        value =>
          value instanceof File ||
          value instanceof Blob ||
          value?.some?.(
            (v: File | Blob) => v instanceof File || v instanceof Blob,
          ),
      )

      if (hasBodyFile) {
        requestBody = generateFormData<D>(body, hasBodyDataField, endpoint)
      }
    }

    const response = await axios[method]<StrapiMutationResponse<T>>(
      requestUrl,
      requestBody,
      config,
    )

    return {
      ...response.data,
      status,
      statusText,
    } as StrapiMutationResponse<T>
  } catch (error: any) {
    if (!isTest) {
      console.error('Mutation error', error)
    }

    // i dont know why but this way onError has first parameter
    if (error.response?.data?.error?.details?.i18nKey) {
      if (!isTest) {
        return {
          data: {
            error: error.response?.data?.error?.details?.i18nKey,
          } as unknown as T,
          meta: {},
          ...error.response,
          status: error.response?.status || 500,
          statusText: error.response?.statusText || 'Internal Server Error',
        } as StrapiMutationResponse<T>
      }

      throw error.response?.data?.error?.details?.i18nKey
    }

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message

    if (isTest) {
      return {
        data: { errorMessage } as unknown as T,
        meta: {},
        status: error.response?.status || 500,
        statusText: error.response?.statusText || 'Internal Server Error',
      } as StrapiMutationResponse<T>
    }

    // but this way, mutate.onError doesn't have first parameter
    throw new Error(errorMessage)
  }
}
