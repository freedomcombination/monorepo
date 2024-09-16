import { APIRequestContext } from '@playwright/test'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { produce } from 'immer'
import qs from 'qs'

import {
  StrapiCollectionResponse,
  StrapiModel,
  StrapiResponse,
  StrapiSingleEndpoint,
  StrapiSingleResponse,
} from '@fc/types'

import {
  RequestByIdArgs,
  RequestCollectionArgs,
  RequestSingleArgs,
} from './types'
import {
  API_URL,
  endpointsSingleType,
  endpointsWithApprovalStatus,
  endpointsWithPublicationState,
  endpointsWithLocale,
} from '../urls'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 25
const DEFAULT_PAGINATION = {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  pageCount: 0,
  total: 0,
}

function strapiRequest<T extends StrapiModel>(
  args: RequestCollectionArgs<T>,
  fetcher?: APIRequestContext,
): Promise<StrapiCollectionResponse<T[]>>

function strapiRequest<T extends StrapiModel>(
  args: RequestSingleArgs,
  fetcher?: APIRequestContext,
): Promise<StrapiSingleResponse<T>>

async function strapiRequest<T extends StrapiModel>(
  args: RequestCollectionArgs<T> | RequestSingleArgs,
  fetcher?: APIRequestContext,
): Promise<StrapiResponse<T>> {
  const collectionArgs = args as RequestCollectionArgs<T>
  const singleArgs = args as RequestSingleArgs
  const idArgs = args as RequestByIdArgs

  const { id, token } = idArgs

  const { endpoint, fields, includeDrafts, populate = '*' } = singleArgs

  const {
    locale,
    filters: initialFilters = {},
    sort = ['createdAt:desc'],
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  } = collectionArgs

  const hasLocale = !id && endpointsWithLocale.includes(endpoint)
  const isSingleType = endpointsSingleType.includes(
    endpoint as StrapiSingleEndpoint,
  )
  const hasApprovalStatus = endpointsWithApprovalStatus.includes(endpoint)
  const hasPublicationState = endpointsWithPublicationState.includes(endpoint)

  const filters = produce(initialFilters, draft => {
    if (!hasApprovalStatus) {
      delete (draft as any).approvalStatus
    }

    if (!hasPublicationState) {
      delete (draft as any).publishedAt
    }
  })

  const pagination = !id && {
    ...(page !== DEFAULT_PAGE && { page }),
    ...(pageSize !== DEFAULT_PAGE_SIZE && { pageSize }),
  }

  const query = qs.stringify(
    {
      ...(pagination && { pagination }),
      ...(fields && { fields }),
      ...(filters && { filters }),
      ...(hasLocale && { locale }),
      ...(hasPublicationState &&
        includeDrafts && { publicationState: 'preview' }),
      populate,
      ...(sort && !id && { sort }),
    },
    { encodeValuesOnly: true },
  )

  const requestUrl = id
    ? `${API_URL}/api/${endpoint}/${id}?${query}`
    : `${API_URL}/api/${endpoint}?${query}`

  try {
    let result: StrapiResponse<T>
    let status: number
    let statusText: string

    if (fetcher) {
      const fetcherResponse = await fetcher.get(requestUrl)
      console.log('fetcherResponse.status()', fetcherResponse.status())
      status = fetcherResponse.status()
      statusText = fetcherResponse.statusText()
      const responseObj = await fetcherResponse.json()
      result = responseObj as StrapiResponse<T>
    } else {
      const axiosResponse = (await axios(
        requestUrl,
        token ? { headers: { Authorization: `Bearer ${token}` } } : {},
      )) as AxiosResponse<StrapiResponse<T>>
      status = axiosResponse.status
      statusText = axiosResponse.statusText

      result = axiosResponse.data as StrapiResponse<T>
    }

    if (!result?.data) {
      if (id || isSingleType) {
        if (endpoint === 'users') {
          return {
            data: result as unknown as T,
            meta: { pagination: null },
            status,
            statusText,
          } as StrapiSingleResponse<T>
        } else if (endpoint === 'users-permissions/roles') {
          return {
            data: (result as any).role as unknown as T,
            meta: { pagination: null },
            status,
            statusText,
          } as StrapiSingleResponse<T>
        }

        return {
          data: result as unknown as T,
          meta: { pagination: null },
          status,
          statusText,
        } as StrapiSingleResponse<T>
      }

      if (endpoint === 'users') {
        return {
          data: result as unknown as T[],
          meta: { pagination: DEFAULT_PAGINATION },
          status,
          statusText,
        }
      } else if (endpoint === 'users-permissions/roles') {
        return {
          data: (result as any).roles as unknown as T,
          meta: { pagination: null },
          status,
          statusText,
        } as StrapiSingleResponse<T>
      }

      return {
        data: [] as T[],
        meta: { pagination: DEFAULT_PAGINATION },
        status,
        statusText,
      } as StrapiCollectionResponse<T[]>
    }

    if (id) {
      return { ...result, status, statusText } as StrapiSingleResponse<T>
    }

    return { ...result, status, statusText } as StrapiCollectionResponse<T[]>
  } catch (err) {
    const error = err as Error | AxiosError
    const status = axios.isAxiosError(error) ? error.response?.status : 500
    const statusText = axios.isAxiosError(error)
      ? error.response?.statusText
      : 'Internal server error'

    if (axios.isAxiosError(error)) {
      console.error(
        'Request error',
        args,
        error.response?.data || error.message,
      )
    } else {
      console.error('Request error', args, error.message)
    }

    if (id || isSingleType) {
      return {
        data: null as unknown as T,
        meta: { pagination: null },
        status,
        statusText,
      } as StrapiSingleResponse<T>
    }

    return {
      data: [] as T[],
      meta: { pagination: DEFAULT_PAGINATION },
      status,
      statusText,
    } as StrapiCollectionResponse<T[]>
  }
}

export { strapiRequest }
