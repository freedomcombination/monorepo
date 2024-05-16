import { useState } from 'react'

import { MenuDivider, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { StrapiModel } from '@fc/types'

import { FilterMenuGroup } from './FilterMenuGroup'
import { RelationFilterMenuGroup } from './RelationFilterMenuGroup'
import { FilterMenuProps, FilterOption } from './types'
import { I18nNamespaces } from '../../../@types/i18next'

export const FilterMenu = <T extends StrapiModel>({
  relationFilterOptions = [],
  setRelationFilter,
  filterOptions = [],
  setFilters,
}: FilterMenuProps<T>) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([])
  const { t } = useTranslation()

  const handleChangeFilters = (filters: FilterOption[]) => {
    setSelectedFilters(filters)
    setFilters(filters)
  }

  if (!filterOptions?.length && !relationFilterOptions?.length) return null

  return (
    <Stack divider={<MenuDivider />}>
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

      <FilterMenuGroup
        options={filterOptions}
        filters={selectedFilters}
        setFilters={handleChangeFilters}
      />
    </Stack>
  )
}
