import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query'

import { useAuthContext } from '@fc/context/auth'
import type {
  StrapiCollectionResponse,
  StrapiModel,
  StrapiSingleResponse,
} from '@fc/types'

import { strapiRequest } from '.'
import { RequestCollectionArgs, RequestSingleArgs } from '.'

type QueryOptions = Partial<UseQueryOptions<unknown, unknown>>

function useStrapiRequest<T extends StrapiModel>(
  args: RequestSingleArgs & {
    queryOptions?: QueryOptions
  },
): UseQueryResult<StrapiSingleResponse<T>>

function useStrapiRequest<T extends StrapiModel>(
  args: RequestCollectionArgs<T> & {
    queryOptions?: QueryOptions
  },
): UseQueryResult<StrapiCollectionResponse<T[]>>

function useStrapiRequest<T extends StrapiModel>({
  queryOptions,
  ...args
}: (RequestCollectionArgs<T> | RequestSingleArgs) & {
  queryOptions?: QueryOptions
}) {
  const auth = useAuthContext()
  const token = auth?.token as string

  return useQuery({
    queryKey: Object.entries(args),
    queryFn: async () => {
      const result = await strapiRequest<T>({
        ...args,
        ...(token && { token }),
      } as any)

      return result
    },
    placeholderData: previousData => previousData,
    ...queryOptions,
  })
}

export { useStrapiRequest }
