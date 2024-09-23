import { useState } from 'react'

import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { sampleSize } from 'lodash'

import { JOB_MOCKS } from '@fc/mocks/job'
import { PLATFORM_MOCKS } from '@fc/mocks/platform'

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
  const [loading, setLoading] = useState<boolean>(false)

  const platforms = PLATFORM_MOCKS.data
  const onSubmit = (data: JoinFormFieldValues) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)

    alert(JSON.stringify(data))
  }

  return (
    <JoinForm
      onSubmitHandler={onSubmit}
      loading={loading}
      platforms={platforms}
      foundationJobs={sampleSize(JOB_MOCKS.data, 3)}
    />
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
