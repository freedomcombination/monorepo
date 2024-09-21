import { FC } from 'react'

import { Flex, useBreakpointValue } from '@chakra-ui/react'
import Masonry from 'react-masonry-css'

import { MasonryGridProps } from './types'

export const MasonryGrid: FC<MasonryGridProps> = ({
  children,
  gap = 4,
  columnGap = 4,
  rowGap = 4,
  cols = [1, 2, 3, 4],
}) => {
  const breakpointCols = useBreakpointValue(cols)

  return (
    <Flex
      as={Masonry}
      breakpointCols={breakpointCols}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
      w={'full'}
      sx={{
        '& .masonry-grid_column': {
          display: 'flex',
          flexDirection: 'column',
          '&:not(:nth-of-type(1))': {
            bgClip: 'padding-box',
            pl: {
              base: cols[0] === 1 ? 0 : columnGap || gap,
              lg: columnGap || gap,
            },
          },

          '& > div': {
            mb: rowGap || gap,
          },
        },
      }}
    >
      {children}
    </Flex>
  )
}
