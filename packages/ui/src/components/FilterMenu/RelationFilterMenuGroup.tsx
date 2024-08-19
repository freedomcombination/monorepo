import { useState } from 'react'

import { chakra } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { MenuRadioItem, MenuRadioItemGroup } from '@fc/chakra'
import { useStrapiRequest } from '@fc/services'
import { StrapiModel } from '@fc/types'
import { mapModelsToOptions } from '@fc/utils'

import { RelationFilterMenuGroupProps } from './types'

export const RelationFilterMenuGroup = <T extends StrapiModel>({
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
    <MenuRadioItemGroup
      onValueChange={e => handleChangeRelationFilters([e.value])}
      value={ids.map(id => id.toString())[0]}
      {...props}
    >
      {mapModelsToOptions(parentData, locale)?.map(model => {
        return (
          <MenuRadioItem key={model.value} value={model.value} maxW={300}>
            <chakra.span lineClamp={1}>{model.label}</chakra.span>
          </MenuRadioItem>
        )
      })}
    </MenuRadioItemGroup>
  )
}
