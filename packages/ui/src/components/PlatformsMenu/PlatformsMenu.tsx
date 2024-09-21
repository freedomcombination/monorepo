import { FC } from 'react'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
} from '@chakra-ui/react'

type PlatformsMenuProps = {
  authenticated?: boolean
  public?: string
}

export const PlatformsMenu: FC<PlatformsMenuProps> = ({
  authenticated,
  public,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverBody>
            <Button colorScheme="blue">Button</Button>
          </PopoverBody>
        </PopoverContent>
        <PopoverContent>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverBody>
            <Button colorScheme="red">Button</Button>
          </PopoverBody>
        </PopoverContent>
        <PopoverContent>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverBody>
            <Button colorScheme="yellow">Button</Button>
          </PopoverBody>
        </PopoverContent>
        <PopoverContent>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverBody>
            <Button colorScheme="cyan">Button</Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
