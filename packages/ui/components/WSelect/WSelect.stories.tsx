import { yupResolver } from '@hookform/resolvers/yup'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { FieldValues, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { WSelectProps } from './types'
import { WSelect } from './WSelect'

const options = [
  { label: 'Category 1', value: '1' },
  { label: 'Category 2', value: '2' },
  { label: 'Category 3', value: '3' },
]

export default {
  title: 'Forms/WSelect',
  component: WSelect,
} as Meta<WSelectProps<(typeof options)[number]>>

const categorySchema = yup.object().shape({
  label: yup.string(),
  value: yup.string(),
})

// SELECT COMPONENT

const objectSchema = yup.object({
  category: categorySchema,
})

type SelectFormFieldValues = yup.InferType<typeof objectSchema>

type Story<T extends FieldValues> = StoryObj<WSelectProps<T>>

const StoryWithHooksSingle: StoryFn<
  WSelectProps<SelectFormFieldValues>
> = args => {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(objectSchema),
    mode: 'all',
  })

  return (
    <WSelect
      {...args}
      name="category"
      errors={errors}
      control={control}
      options={options}
      colorPalette="primary"
      placeholder="Select a category"
    />
  )
}

export const Default: Story<SelectFormFieldValues> = {
  render: StoryWithHooksSingle,
  args: {
    label: 'Default',
  },
}

export const Multiple: Story<SelectFormFieldValues> = {
  render: StoryWithHooksSingle,
  args: {
    label: 'Check',
    multiple: true,
  },
}

// MULTISELECT COMPONENT

const arraySchema = yup.object({
  categories: yup.array().of(categorySchema).required(),
})

type SelectFormMultiFieldValues = yup.InferType<typeof arraySchema>

const StoryWithHooksMultiple: StoryFn<
  WSelectProps<SelectFormMultiFieldValues>
> = args => {
  const {
    control,
    formState: { errors },
  } = useForm<SelectFormMultiFieldValues>({
    resolver: yupResolver(arraySchema),
    mode: 'all',
  })

  return (
    <WSelect
      {...args}
      name="categories"
      errors={errors}
      control={control}
      options={options}
      multiple
      colorPalette="primary"
      placeholder="Select categories"
    />
  )
}

export const Multi: Story<SelectFormMultiFieldValues> = {
  render: StoryWithHooksMultiple,
  args: {
    label: 'Multi',
  },
}
