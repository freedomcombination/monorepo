import { Meta, StoryObj } from '@storybook/react'

import { COURSE_MOCKS } from '@fc/mocks/course'

import { CourseDetailPage } from './CourseDetailPage'
import { CourseDetailPageProps } from './types'
// import { SOURCE_MOCKS } from './mocks'
export default {
  title: 'Forms/CourseDetailPage',
  component: CourseDetailPage,
} as Meta<CourseDetailPageProps>

type Story = StoryObj<CourseDetailPageProps>

export const Default: Story = {
  args: {
    course: COURSE_MOCKS.data[0],
  },
}
