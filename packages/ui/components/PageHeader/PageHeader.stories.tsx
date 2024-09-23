import {
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'
import { FaArrowUp } from 'react-icons/fa'

import { PageHeader } from './index'

export default {
  component: PageHeader,
  title: 'Admin/PageHeader',
} as Meta<typeof PageHeader>

type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    onSearch: (item?: string | null) => {
      alert(item)
    },
    filterMenu: (
      <MenuOptionGroup
        title="Artists"
        type="checkbox"
        onChange={value => alert(`Filter applied: ${value}`)}
      >
        <MenuItemOption closeOnSelect={false} value="1">
          Ali
        </MenuItemOption>
        <MenuItemOption closeOnSelect={false} value="2">
          Mehmet
        </MenuItemOption>
        <MenuItemOption closeOnSelect={false} value="3">
          Merve
        </MenuItemOption>
      </MenuOptionGroup>
    ),
    sortMenu: (
      <>
        <MenuOptionGroup
          defaultValue="title:asc"
          title="Order"
          type="radio"
          onChange={value => alert(`Sorted by ${value}`)}
        >
          <MenuItemOption value="title:asc">Ascending</MenuItemOption>
          <MenuItemOption value="title:desc">Descending</MenuItemOption>
        </MenuOptionGroup>

        <MenuDivider />
        <MenuItem
          icon={<FaArrowUp />}
          onClick={() => alert('Sort user ascending')}
        >
          User name ascending
        </MenuItem>
      </>
    ),
  },
}
