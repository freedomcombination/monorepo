import { useState } from 'react'

import { MenuItemOption, MenuOptionGroup, chakra } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useStrapiRequest } from '@fc/services'
import { StrapiModel } from '@fc/types'

import { RelationFilterMenuGroupProps } from './types'
import { mapModelsToOptions } from '../ModelForm'

export const RelationFilterMenuGroup = <T extends StrapiModel>({
  type = 'checkbox',
  relationFilter,
  setRelationFilter,
  ...props
}: RelationFilterMenuGroupProps<T>) => {
  const { locale } = useRouter()

  const [ids, setIds] = useState<number[]>([])

  const modelsQuery = useStrapiRequest<T>({
    endpoint: relationFilter.endpoint,
    populate: [],
    locale,
    filters: relationFilter.queryFilters,
  })

  const parentData = modelsQuery.data?.data || []

  const handleChangeRelationFilters = (value: string | string[]) => {
    const idValues = (value as string[]).map(v => +v)

    setIds(idValues)
    setRelationFilter({
      field: relationFilter.field,
      ids: idValues,
      endpoint: relationFilter.endpoint,
    })
  }

  return (
    <MenuOptionGroup
      onChange={handleChangeRelationFilters}
      value={ids.map(id => id.toString())}
      type={type}
      {...props}
    >
      {mapModelsToOptions(parentData, locale)?.map(model => {
        return (
          <MenuItemOption key={model.value} value={model.value} maxW={300}>
            <chakra.span noOfLines={1}>{model.label}</chakra.span>
          </MenuItemOption>
        )
      })}
    </MenuOptionGroup>
  )
}
