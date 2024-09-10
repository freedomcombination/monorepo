import { useMemo } from 'react'

import { TableCell, TableColumn, chakra } from '@chakra-ui/react'
import { camelCase, startCase } from 'lodash'
import { useTranslation } from 'next-i18next'
import { FaArrowDown, FaArrowUp, FaSort } from 'react-icons/fa6'

import { StrapiModel } from '@fc/types'

import { TableHeaderCellProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'

export const TableHeaderCell = <T extends StrapiModel>({
  column,
  index,
  selectedIndex,
  sortMode,
  setSelectedIndex,
  setSortMode,
}: TableHeaderCellProps<T>) => {
  const { t } = useTranslation()

  const toggleSort = (index: number) => {
    setSelectedIndex(index)

    if (sortMode === 'asc') {
      setSortMode('desc')
    } else if (sortMode === 'desc') {
      setSortMode(null)
    } else if (sortMode === null) {
      setSortMode('asc')
    }
  }

  const { sortable, label } = column

  const translationLabel = t(
    (label || column.accessorKey) as keyof I18nNamespaces['common'],
    {
      defaultValue: label || startCase(camelCase(column.accessorKey as string)),
    },
  )

  const SortIcon = useMemo(() => {
    if (!sortable) return

    if (selectedIndex === index) {
      if (sortMode === 'asc') {
        return FaArrowUp
      } else if (sortMode === 'desc') {
        return FaArrowDown
      }
    }

    return FaSort
  }, [index, selectedIndex, sortMode, sortable])

  const onSort = () => toggleSort(index)

  return (
    <TableCell
      pos="relative"
      key={index}
      whiteSpace="nowrap"
      {...(sortable && {
        cursor: 'pointer',
        onClick: onSort,
      })}
    >
      {translationLabel}

      <chakra.span ml={2} display="inline" as={SortIcon} />
    </TableCell>
  )
}
