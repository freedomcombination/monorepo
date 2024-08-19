import { FC, ReactNode } from 'react'

import { Flex, useBreakpointValue } from '@chakra-ui/react'
import Masonry from 'react-masonry-css'

export interface MasonryGridProps {
  gap?: number
  columnGap?: number
  rowGap?: number
  cols?: Array<number>
  children: ReactNode
}

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
      w={'full'}
      css={{
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
      <Masonry
        breakpointCols={breakpointCols}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
        width={'100%'}
      >
        {children}
      </Masonry>
    </Flex>
  )
}
