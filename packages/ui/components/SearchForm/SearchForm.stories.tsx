import { StoryObj, Meta } from '@storybook/react'

import { SearchForm } from './SearchForm'
import { SearchFormProps } from './types'

export default {
  title: 'Forms/SearchForm',
  component: SearchForm,
} as Meta<typeof SearchForm>

type Story = StoryObj<SearchFormProps>

export const Default: Story = {}
export const Click: Story = {
  args: { mode: 'click' },
}
