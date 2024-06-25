import { Tr } from '@chakra-ui/react'

import { StrapiModel } from '@fc/types'

import { CellConfig, WTableRowProps } from './types'
import { WTableCell } from './WTableCell'

export const WTableRow = <T extends StrapiModel>({
  columns,
  model,
  modelIndex,
  onClick,
}: WTableRowProps<T>) => {
  return (
    <Tr
      onClick={() => onClick?.(modelIndex, model.id)}
      _hover={{ bg: 'blackAlpha.50', cursor: 'pointer' }}
    >
      {Object.keys(columns).map((key, index) => {
        const field = key as keyof T
        const value = model[field]
        const cell = columns[field] as CellConfig<T>

        return (
          <WTableCell
            key={index}
            value={value}
            cellConfig={cell}
            field={field}
          />
        )
      })}
    </Tr>
  )
}
