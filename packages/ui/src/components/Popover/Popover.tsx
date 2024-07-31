import { FC } from 'react'

import { Popover as ChakraPopover, PopoverContentProps } from '@chakra-ui/react'

export const Popover = ChakraPopover.Root
export const PopoverTrigger = ChakraPopover.Trigger
export const PopoverBody = ChakraPopover.Body
export const PopoverHeader = ChakraPopover.Header
export const PopoverFooter = ChakraPopover.Footer
export const PopoverArrow = ChakraPopover.Arrow

export const PopoverContent: FC<PopoverContentProps> = props => {
  return (
    <ChakraPopover.Positioner>
      <ChakraPopover.Content {...props} />
    </ChakraPopover.Positioner>
  )
}
