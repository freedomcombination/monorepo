import { useState } from 'react'

import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { sampleSize } from 'lodash'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const platforms = PLATFORM_MOCKS.data
  const onSubmit = (data: JoinFormFieldValues) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    alert(JSON.stringify(data))
  }

  return (
    <JoinForm
      foundationInfo={SOURCE_MOCK}
      onSubmitHandler={onSubmit}
      isLoading={isLoading}
      platforms={platforms}
      foundationJobs={sampleSize(JOB_MOCKS.data, 3)}
    />
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
