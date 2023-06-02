import { StoryObj, Meta } from '@storybook/react'

import { SearchForm, SearchFormProps } from '.'

export default {
  title: 'Forms/SearchForm',
  component: SearchForm,
} as Meta<typeof SearchForm>

type Story = StoryObj<SearchFormProps>

export const Default: Story = {}
