import { MenuOptionGroupProps } from '@chakra-ui/react'

import { RequestCollectionArgs } from '@fc/services/common/strapiRequest'
import type {
  StrapiCollectionEndpoint,
  StrapiModel,
  StrapiModelKeys,
} from '@fc/types'

export type FilterField =
  | StrapiModelKeys
  | `${StrapiModelKeys}.${StrapiModelKeys}`
  | `(ext)${StrapiModelKeys}.${StrapiModelKeys}`
  | `(ext)${StrapiModelKeys}`

export type FilterOption = {
  field: FilterField
  label: string
  operator:
    | '$eq'
    | '$eqi'
    | '$ne'
    | '$nei'
    | '$lt'
    | '$lte'
    | '$gt'
    | '$gte'
    | '$in'
    | '$notIn'
    | '$contains'
    | '$notContains'
    | '$containsi'
    | '$notContainsi'
    | '$null'
    | '$notNull'
    | '$between'
    | '$startsWith'
    | '$startsWithi'
    | '$endsWith'
    | '$endsWithi'
    | '$or'
    | '$and'
    | '$not'
}

export type RelationFilterArgs = {
  endpoint: StrapiCollectionEndpoint
  field: FilterField
  ids: number[]
}

export type RelationFilterOption<T extends StrapiModel> = {
  endpoint: StrapiCollectionEndpoint
  field: FilterField
  label?: string
  queryFilters?: RequestCollectionArgs<T>['filters']
}

export type FilterMenuProps<T extends StrapiModel> = {
  booleanFilterOptions?: FilterOption[]
  relationFilterOptions?: RelationFilterOption<T>[]
  setRelationFilter: (args: RelationFilterArgs) => void
  setBooleanFilters: (filters: FilterOption[]) => void
}

export type RelationFilterMenuGroupProps<T extends StrapiModel> =
  MenuOptionGroupProps & {
    relationFilter: RelationFilterOption<T>
    setRelationFilter: (args: RelationFilterArgs) => void
  }

export type FilterMenuGroupProps = MenuOptionGroupProps & {
  options: FilterOption[]
  filters: FilterOption[]
  setFilters: (filters: FilterOption[]) => void
}
