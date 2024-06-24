import { Tr } from '@chakra-ui/react'

import { StrapiLocale, StrapiModel } from '@fc/types'

import { convertTRCharsToEN } from './convertChars'
import { CellConfig, WTableRowProps } from './types'
import { WTableCell, getCellForPDF } from './WTableCell'

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

export const getRowForPDF = <T extends StrapiModel>(
  model: T,
  columns: { [key in keyof T]?: CellConfig<T> },
  locale: StrapiLocale,
  t: (a: string, b?: object) => string,
): string[] => {
  return Object.keys(columns).map(key => {
    const field = key as keyof T
    const value = model[field]
    const cell = columns[field] as CellConfig<T>

    const cellValue = getCellForPDF(value, cell, field, locale, t)

    return convertTRCharsToEN(cellValue)
  })
}
