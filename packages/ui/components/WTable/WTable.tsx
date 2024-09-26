import { useEffect, useState } from 'react'

import { Table, Tbody, Thead, Tr } from '@chakra-ui/react'

import type { StrapiModel } from '@fc/types'

import { TableHeaderCell } from './TableHeaderCell'
import { WTableRow } from './TableRow'
import { CellConfig, WTableProps } from './types'

export const WTable = <T extends StrapiModel>({
  data,
  columns,
  onClickRow,
  onSort,
  ...rest
}: WTableProps<T>) => {
  const [sortMode, setSortMode] = useState<'desc' | 'asc' | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selectedColumn = selectedIndex
    ? columns[selectedIndex]
    : ({} as CellConfig<T>)

  const selectedKey = selectedColumn.accessorKey as string

  useEffect(() => {
    const { transform, sortKey } = selectedColumn

    if (sortMode && selectedKey) {
      if (transform && sortKey) {
        onSort?.([`${selectedKey}.${sortKey}:${sortMode}`])
      } else {
        onSort?.([`${selectedKey}:${sortMode}`])
      }
    } else if (!sortMode && selectedIndex) {
      onSort?.(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortMode, selectedIndex])

  return (
    <Table size="sm" cursor="default" {...rest}>
      <Thead pos={'sticky'} top={0} zIndex={0} h={8} bg={'white'} shadow={'sm'}>
        <Tr>
          {columns.map((column, index) => {
            return (
              <TableHeaderCell
                column={column}
                index={index}
                key={index}
                selectedIndex={selectedIndex}
                sortMode={sortMode}
                setSelectedIndex={setSelectedIndex}
                setSortMode={setSortMode}
              />
            )
          })}
        </Tr>
      </Thead>
      <Tbody>
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
      </Tbody>
    </Table>
  )
}
