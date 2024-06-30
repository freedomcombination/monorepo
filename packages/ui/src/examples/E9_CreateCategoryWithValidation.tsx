/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'

import { Button, Code, Input, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { CategoryCreateInput } from '@fc/types'

import { createCategoryWithMutation } from './utils'
import { FormItem } from '../components'

const schema = yup.object().shape({
  name_en: yup.string().required('Name (english) is required'),
  name_tr: yup.string().required('Name (turkish) is required'),
  name_nl: yup.string().required('Name (dutch) is required')
})


export const CreateCategoryWithValidation = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryCreateInput>({
    resolver: yupResolver(schema)
  })

  const { mutate, data, isPending } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (data: CategoryCreateInput) => createCategoryWithMutation(data),
  })

  const name_en = watch('name_en')

  useEffect(() => {
    // TODO: Update slug with slugify on name_en change
    setValue('slug', slugify(name_en ?? ''));
  }, [name_en])

  const onSubmit = async (data: CategoryCreateInput) => {
    mutate(data)
  }

  return (
    <Stack>
      <Code as={'pre'}>{JSON.stringify(watch(), null, 2)}</Code>
      <Code as={'pre'}>{JSON.stringify(data, null, 2)}</Code>
      <Stack as={'form'} onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: Add all inputs */}

        <FormItem placeholder="Category name (en)" name='name_en' register={register} errors={errors} />
        <FormItem placeholder="Category name (tr)" name='name_tr' register={register} errors={errors} />
        <FormItem placeholder="Category name (nl)" name='name_nl' register={register} errors={errors} />
        <Input placeholder="Slug" value={watch('slug')} isReadOnly />

        <Button
          type={'submit'}
          isLoading={isPending}
          loadingText={'Creating...'}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  )
}
