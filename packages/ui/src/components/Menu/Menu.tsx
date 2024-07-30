import { Menu as ChakraMenu, MenuItemGroupProps } from '@chakra-ui/react'
import { FC } from 'react'

export const Menu = ChakraMenu.Root
export const MenuDivider = ChakraMenu.Separator
export const MenuItem = ChakraMenu.Item
export const MenuOptionGroup = ChakraMenu.RadioItemGroup
export const MenuItemOption = ChakraMenu.RadioItem
export const MenuButton = ChakraMenu.Trigger

export const MenuList: FC<MenuItemGroupProps> = props => {
  return (
    <ChakraMenu.Positioner>
      <ChakraMenu.Content>
        <ChakraMenu.ItemGroup {...props} />
      </ChakraMenu.Content>
    </ChakraMenu.Positioner>
  )
}
