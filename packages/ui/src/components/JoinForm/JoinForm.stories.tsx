import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { JOB_MOCKS, PLATFORM_MOCKS, SOURCE_MOCK } from '@fc/mocks'

import { JoinForm } from './JoinForm'
import { JoinFormFieldValues, JoinFormProps } from './types'

export default {
  title: 'Forms/JoinForm',
  component: JoinForm,
  args: {
    platforms: PLATFORM_MOCKS.data,
    jobs: JOB_MOCKS.data,
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<typeof JoinForm>

type Story = StoryObj<typeof JoinForm>

const StoryWithHook: StoryFn<JoinFormProps> = () => {
  const onSubmit = (data: JoinFormFieldValues) => {
    alert(JSON.stringify(data))
  }

  return (
    <JoinForm
      foundationInfo={SOURCE_MOCK}
      onSubmitHandler={onSubmit}
      jobs={JOB_MOCKS.data}
    />
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
