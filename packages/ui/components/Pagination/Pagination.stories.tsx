import { useEffect, useState } from 'react'

import { StoryFn, Meta, StoryObj } from '@storybook/react'

import { Pagination } from './Pagination'
import { PaginationProps } from './types'

export default {
  title: 'Forms/Pagination',
  component: Pagination,
  args: {
    currentPage: 3,
    totalCount: 10,
    siblingCount: 2,
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} as Meta<PaginationProps>

type Story = StoryObj<PaginationProps>

const StoryWithHook: StoryFn<PaginationProps> = args => {
  const [currentPage, setCurrentPage] = useState<number>(args.currentPage)

  useEffect(() => {
    setCurrentPage(args.currentPage)
  }, [args.currentPage])

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  )
}

export const Default: Story = {
  render: StoryWithHook,
}

export const NotAttached: Story = {
  render: StoryWithHook,
  args: {
    isAttached: false,
  },
}
export const Variant: Story = {
  render: StoryWithHook,
  args: {
    variant: 'ghost',
  },
}

export const Size: Story = {
  render: StoryWithHook,
  args: {
    size: 'sm',
  },
}
