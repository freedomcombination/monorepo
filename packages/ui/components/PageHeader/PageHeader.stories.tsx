import { MenuSeparator, MenuItem } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'
import { FaArrowUp } from 'react-icons/fa'

import {
  Button,
  MenuCheckboxItem,
  MenuItemGroup,
  MenuRadioItem,
  MenuRadioItemGroup,
} from '@fc/chakra'

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
      <MenuItemGroup
        title="Artists"
        onChange={value => alert(`Filter applied: ${value}`)}
      >
        <MenuCheckboxItem closeOnSelect={false} value="1" checked>
          Ali
        </MenuCheckboxItem>
        <MenuCheckboxItem closeOnSelect={false} value="2" checked={false}>
          Mehmet
        </MenuCheckboxItem>
        <MenuCheckboxItem closeOnSelect={false} value="3" checked={false}>
          Merve
        </MenuCheckboxItem>
      </MenuItemGroup>
    ),
    sortMenu: (
      <>
        <MenuRadioItemGroup
          defaultValue="title:asc"
          title="Order"
          onValueChange={e => alert(`Sorted by ${e.value}`)}
        >
          <MenuRadioItem value="title:asc">Ascending</MenuRadioItem>
          <MenuRadioItem value="title:desc">Descending</MenuRadioItem>
        </MenuRadioItemGroup>

        <MenuSeparator />
        <MenuItem value="name:asc" asChild>
          <Button
            leftIcon={<FaArrowUp />}
            onClick={() => alert('Sort user ascending')}
          >
            User name ascending
          </Button>
        </MenuItem>
      </>
    ),
  },
}
