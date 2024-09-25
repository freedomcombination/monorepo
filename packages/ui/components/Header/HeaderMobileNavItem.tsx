import { FC } from 'react'

import { Box } from '@chakra-ui/react'

import { ChildMenuItem } from './ChildMenuItem'
import { HeaderMobileNavItemProps } from './types'

export const HeaderMobileNavItem: FC<HeaderMobileNavItemProps> = ({ item }) => {
  return (
    <>
      <Box py={2}>
        <ChildMenuItem item={item} isMobile />
      </Box>
      {item.children?.map((child, index) => (
        <Box
          key={index}
          pl={4}
          py={2}
          sx={{ a: { color: 'gray.500', fontWeight: 500 } }}
        >
          <ChildMenuItem item={child} isMobile />
        </Box>
      ))}
    </>
  )
}
