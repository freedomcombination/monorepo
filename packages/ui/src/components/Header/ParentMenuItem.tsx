import { FC } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { omit } from 'lodash'

import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@fc/chakra'

import { ChildMenuItem } from './ChildMenuItem'
import { MenuTypeItemProps } from './types'

export const ParentMenuItem: FC<MenuTypeItemProps> = ({ item, isDark }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box p={2} w="max-content" cursor={'pointer'}>
          <ChildMenuItem item={omit(item, 'link')} isDark={isDark} />
        </Box>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow boxSize={16} />
        <PopoverBody>
          <Stack>
            {item.children?.map(item => (
              <Box py={1} key={item.link}>
                <ChildMenuItem item={item} isDark={false} />
              </Box>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
