import { FC } from 'react'

import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react'
import { omit } from 'lodash'

import { ChildMenuItem } from './ChildMenuItem'
import { MenuTypeItemProps } from './types'

export const ParentMenuItem: FC<MenuTypeItemProps> = ({
  item,
  isDark,
  isMobile,
}) => {
  return (
    <Popover trigger="hover" arrowSize={16}>
      <PopoverTrigger>
        <Box p={2} w="max-content" cursor={'pointer'}>
          <ChildMenuItem
            item={omit(item, 'link')}
            isDark={isDark}
            isMobile={isMobile}
          />
        </Box>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            {item.children?.map(item => (
              <Box py={1} key={item.link}>
                <ChildMenuItem item={item} isDark={false} isMobile={isMobile} />
              </Box>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
