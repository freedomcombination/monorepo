/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'

import { Code, Input, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { CategoryCreateInput } from '@fc/types'
import { Button } from '@fc/ui'

import { createCategoryWithMutation } from './utils'
import { FormItem } from '../components'

const schema = yup.object().shape({
  name_en: yup.string().required(),
  // TODO: Add all inputs
})

export const CreateCategoryWithValidation = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryCreateInput>({
    // resolver: yupResolver(schema),
  })

  const { mutate, data, isPending } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (data: CategoryCreateInput) => createCategoryWithMutation(data),
  })

  const name_en = watch('name_en')

  useEffect(() => {
    // TODO: Update slug with slugify on name_en change
  }, [])

  const onSubmit = async (data: CategoryCreateInput) => {
    mutate(data)
  }

  return (
    <Stack>
      <Code as={'pre'}>{JSON.stringify(data, null, 2)}</Code>
      <Stack as={'form'} onSubmit={handleSubmit(onSubmit)}>
        <FormItem
          placeholder="Category name (en)"
          name="name_en"
          register={register}
          errors={errors}
        />
        {/* TODO: Add all inputs */}

        <Button type={'submit'} isLoading={isPending}>
          Submit
        </Button>
      </Stack>
    </Stack>
  )
}
