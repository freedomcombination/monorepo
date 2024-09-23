import { FC } from 'react'

import { useTranslation } from 'next-i18next'

import { MenuRadioItem, MenuRadioItemGroup } from '@fc/chakra'

import { FilterMenuGroupProps } from './types'

export const FilterMenuGroup: FC<FilterMenuGroupProps> = ({
  options,
  setFilters,
  filters,
  ...props
}) => {
  const { t } = useTranslation()

  const selectedValues = filters.map(option => option.field)

  const handleChangeFilters = (value: string | string[]) => {
    const selected = options.filter(option =>
      (value as string[]).includes(option.field),
    )

    setFilters(selected)
  }

  if (!options?.length) return null

  return (
    <MenuRadioItemGroup
      onValueChange={e => handleChangeFilters([e.value])}
      title={t('filters')}
      value={selectedValues[0]}
      maxH={300}
      overflowY={'auto'}
      {...props}
    >
      {options.map(option => {
        return (
          <MenuRadioItem key={option.field} value={`${option.field}`}>
            {option.label}
          </MenuRadioItem>
        )
      })}
    </MenuRadioItemGroup>
  )
}
