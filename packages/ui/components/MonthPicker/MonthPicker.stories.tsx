import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { MonthPicker } from './MonthPicker'

export default {
  component: MonthPicker,
  title: 'Shared/MonthPicker',
} as Meta<typeof MonthPicker>

type Story = StoryObj<typeof MonthPicker>

export const Default: Story = {}

export const DisableFuture: Story = {
  args: {
    disableFuture: true,
  },
}

const StoryWithSelect: StoryFn<typeof MonthPicker> = args => {
  return (
    <MonthPicker
      {...args}
      onSelect={args => alert(JSON.stringify(args, null, 2))}
    />
  )
}

const StoryWithRange: StoryFn<typeof MonthPicker> = args => {
  return (
    <MonthPicker
      {...args}
      onRangeSelect={args => alert(JSON.stringify(args, null, 2))}
    />
  )
}

export const WithSelect: Story = {
  render: StoryWithSelect,
}

export const WithRange: Story = {
  render: StoryWithRange,
}
