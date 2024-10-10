import React from 'react'

import { SimpleGrid } from '@chakra-ui/react'

import { Month } from './Month'
import { YearProps } from './types'

const monthsNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export const Year = ({ columns, ...rest }: YearProps) => {
  return (
    <SimpleGrid gap={2} columns={columns}>
      {monthsNumber.map(month => (
        <Month key={month} monthIndex={month} {...rest} />
      ))}
    </SimpleGrid>
  )
}
