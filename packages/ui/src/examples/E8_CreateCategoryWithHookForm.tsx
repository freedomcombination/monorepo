/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'

import { Button, Code, Input, Stack } from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { CategoryCreateInput } from '@fc/types'

import { createCategoryWithMutation } from './utils'

export const CreateCategoryWithHookForm = () => {
  const { register, handleSubmit, watch, setValue } =
    useForm<CategoryCreateInput>()

  const { mutate, data, isPending } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (data: CategoryCreateInput) => createCategoryWithMutation(data),
  })

  const name_en = watch('name_en')

  useEffect(() => {
    // TODO: Update slug with slugify on name_en change
  }, [])

  const onSubmit = async (data: CategoryCreateInput) => {
    const body = { ...data, slug: slugify(data.name_en ?? '') }

    mutate(body)
  }

  return (
    <Stack>
      <Code as={'pre'}>{JSON.stringify(data, null, 2)}</Code>
      <Stack as={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Category name (tr)" {...register('name_en')} />
        {/* TODO: Add all inputs */}

        <Button type={'submit'} loading={isPending} loadingText={'Creating...'}>
          Submit
        </Button>
      </Stack>
    </Stack>
  )
}
