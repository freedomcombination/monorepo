import { FC } from 'react'

import { MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { FilterMenuGroupProps } from './types'

export const FilterMenuGroup: FC<FilterMenuGroupProps> = ({
  options,
  setFilters,
  filters,
  type = 'checkbox',
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
    <MenuOptionGroup
      onChange={handleChangeFilters}
      title={t('filters')}
      value={selectedValues}
      type={type}
      maxH={300}
      overflowY={'auto'}
      {...props}
    >
      {options.map(option => {
        return (
          <MenuItemOption key={option.field} value={`${option.field}`}>
            {option.label}
          </MenuItemOption>
        )
      })}
    </MenuOptionGroup>
  )
}
