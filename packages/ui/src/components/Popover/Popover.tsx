import { Popover as ChakraPopover, PopoverContentProps } from '@chakra-ui/react'
import { FC } from 'react'

export const Popover = ChakraPopover.Root
export const PopoverTrigger = ChakraPopover.Trigger
export const PopoverBody = ChakraPopover.Body

export const PopoverContent: FC<PopoverContentProps> = props => {
  return (
    <ChakraPopover.Positioner>
      <ChakraPopover.Content {...props} />
    </ChakraPopover.Positioner>
  )
}
