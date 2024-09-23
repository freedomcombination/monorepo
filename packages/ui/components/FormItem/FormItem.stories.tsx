import { Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { StoryFn, StoryObj, Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { FaEnvelope } from 'react-icons/fa'
import * as yup from 'yup'

import { FormItem } from './FormItem'
import { FormItemProps } from './types'

export default {
  title: 'Forms/FormItem',
  component: FormItem,
} as Meta<FormItemProps>

type FormType = {
  email: string
}

const schema = yup.object({
  email: yup.string().email().required(),
})

type Story = StoryObj<FormItemProps>

const StoryWithHook: StoryFn<FormItemProps> = args => {
  const {
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  return <FormItem {...args} name="email" errors={errors} register={register} />
}

export const Default: Story = {
  render: StoryWithHook,
}

export const LeftElement: Story = {
  render: StoryWithHook,
  args: {
    leftElement: <FaEnvelope />,
  },
}

export const AsTextarea: Story = {
  render: StoryWithHook,
  args: {
    as: Textarea,
    label: 'Textarea',
    placeholder: 'Enter text',
  },
}
