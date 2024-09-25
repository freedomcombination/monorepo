import type {
  Sort,
  StrapiCollectionEndpoint,
  StrapiEndpoint,
  StrapiFilter,
  StrapiLocale,
  StrapiModel,
  StrapiSingleEndpoint,
} from '@fc/types'

export type RequestCommonArgs = {
  fields?: string[]
  includeDrafts?: boolean
  populate?: string | string[] | null
  token?: string
  sort?: Sort
}

export type RequestCollectionArgs<T extends StrapiModel> = RequestCommonArgs & {
  filters?: StrapiFilter<T>
  locale?: StrapiLocale
  page?: number
  pageSize?: number
  endpoint: StrapiCollectionEndpoint
}

export type RequestByIdArgs = RequestCommonArgs & {
  id: number
  endpoint: StrapiEndpoint
}

export type SingleTypeArgs = RequestCommonArgs & {
  endpoint: StrapiSingleEndpoint
  locale?: StrapiLocale
}

export type RequestSingleArgs = RequestByIdArgs | SingleTypeArgs
