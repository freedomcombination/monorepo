import { useEffect, useState } from 'react'

import { chakra, Table } from '@chakra-ui/react'
import { camelCase, startCase } from 'lodash'
import { useTranslation } from 'next-i18next'
import { FaArrowDown, FaArrowUp, FaSort } from 'react-icons/fa'

import { StrapiModel, StrapiModelKeys } from '@fc/types'

import { WTableRow } from './TableRow'
import { CellConfig, WTableProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'

export const WTable = <T extends StrapiModel>({
  data,
  columns,
  onClickRow,
  onSort,
  ...rest
}: WTableProps<T>) => {
  const [sortMode, setSortMode] = useState<'desc' | 'asc' | null>(null)
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)

  const { t } = useTranslation()

  const toggleSort = (columnKey: string) => {
    setSelectedColumn(columnKey)

    if (sortMode === 'asc') {
      setSortMode('desc')
    } else if (sortMode === 'desc') {
      setSortMode(null)
    } else {
      setSortMode('asc')
    }
  }

  useEffect(() => {
    const { transform, sortKey } = columns?.[selectedColumn as keyof T] || {}

    if (sortMode && selectedColumn) {
      if (transform && sortKey) {
        onSort?.([`${selectedColumn}.${sortKey}:${sortMode}`])
      } else {
        onSort?.([`${selectedColumn}:${sortMode}`])
      }
    } else if (!sortMode && selectedColumn) {
      onSort?.(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode, selectedColumn])

  return (
    <Table.Root size="sm" cursor="default" {...rest}>
      <Table.Header
        pos={'sticky'}
        top={0}
        zIndex={0}
        h={8}
        bg={'white'}
        shadow={'sm'}
      >
        <Table.ColumnHeader>
          {Object.keys(columns).map((key, index) => {
            const isSortable = (columns[key as keyof T] as CellConfig<T>)
              .sortable

            const { label } = columns[key as keyof T] as CellConfig<T>
            const translationLabel = t(
              (label || key) as keyof I18nNamespaces['common'],
              {
                defaultValue: label || startCase(camelCase(key)),
              },
            )

            const getSortIcon = () => {
              if (!isSortable) return

              if (selectedColumn === key) {
                if (sortMode === 'asc') {
                  return FaArrowUp
                } else if (sortMode === 'desc') {
                  return FaArrowDown
                }
              }

              return FaSort
            }

            return (
              <Table.ColumnHeader
                pos="relative"
                key={index}
                whiteSpace="nowrap"
                {...(isSortable && {
                  cursor: 'pointer',
                  onClick: () => toggleSort(key as StrapiModelKeys),
                })}
              >
                {translationLabel}

                <chakra.span ml={2} display="inline" as={getSortIcon()} />
              </Table.ColumnHeader>
            )
          })}
        </Table.ColumnHeader>
      </Table.Header>
      <Table.Body>
        {data.map((model, index) => {
          return (
            <WTableRow
              key={index}
              model={model}
              modelIndex={index}
              columns={columns}
              onClick={onClickRow}
            />
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
