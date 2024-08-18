import { useState } from 'react'

import { MenuSeparator, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { StrapiModel } from '@fc/types'

import { FilterMenuGroup } from './FilterMenuGroup'
import { RelationFilterMenuGroup } from './RelationFilterMenuGroup'
import { FilterMenuProps, FilterOption } from './types'
import { I18nNamespaces } from '../../../@types/i18next'

export const FilterMenu = <T extends StrapiModel>({
  relationFilterOptions = [],
  setRelationFilter,
  booleanFilterOptions = [],
  setBooleanFilters,
}: FilterMenuProps<T>) => {
  const [selectedBooleanFilters, setSelectedBooleanFilters] = useState<
    FilterOption[]
  >([])
  const { t } = useTranslation()

  const handleChangeFilters = (filters: FilterOption[]) => {
    setSelectedBooleanFilters(filters)
    setBooleanFilters(filters)
  }

  if (!booleanFilterOptions?.length && !relationFilterOptions?.length)
    return null

  return (
    <Stack divider={<MenuSeparator />}>
      <FilterMenuGroup
        options={booleanFilterOptions}
        filters={selectedBooleanFilters}
        setFilters={handleChangeFilters}
      />
      {relationFilterOptions?.length > 0 &&
        relationFilterOptions?.map((filter, index) => (
          <RelationFilterMenuGroup
            key={index}
            title={
              filter.label || t(filter.field as keyof I18nNamespaces['common'])
            }
            relationFilter={filter}
            setRelationFilter={setRelationFilter}
          />
        ))}
    </Stack>
  )
}
