import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query'

import { useAuthContext } from '@fc/context'
import {
  RequestCollectionArgs,
  RequestSingleArgs,
  strapiRequest,
} from '@fc/lib'
import {
  StrapiCollectionResponse,
  StrapiModel,
  StrapiSingleResponse,
} from '@fc/types'

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

function useStrapiRequest<T extends StrapiModel>(
  args: (RequestCollectionArgs<T> | RequestSingleArgs) & {
    queryOptions?: QueryOptions
  },
) {
  const auth = useAuthContext()
  const token = auth?.token as string

  return useQuery({
    queryKey: Object.entries(args),
    queryFn: () =>
      strapiRequest<T>({ ...args, ...(token && { token }) } as any),
    placeholderData: previousData => previousData,
    ...args.queryOptions,
  })
}

export { useStrapiRequest }
