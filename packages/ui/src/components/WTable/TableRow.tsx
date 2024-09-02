import { Table } from '@chakra-ui/react'

import { StrapiModel } from '@fc/types'

import { WTableRowProps } from './types'
import { WTableCell } from './WTableCell'

export const WTableRow = <T extends StrapiModel>({
  columns,
  model,
  modelIndex,
  onClick,
}: WTableRowProps<T>) => {
  return (
    <Table.Row
      onClick={() => onClick?.(modelIndex, model.id)}
      _hover={{ bg: 'blackAlpha.50', cursor: 'pointer' }}
    >
      {columns.map((column, index) => {
        return <WTableCell key={index} column={column} model={model} />
      })}
    </Table.Row>
  )
}
