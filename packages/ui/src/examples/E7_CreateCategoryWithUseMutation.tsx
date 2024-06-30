/* eslint-disable @typescript-eslint/no-unused-vars */

import { FormEventHandler, useEffect, useState } from 'react'

import { Button, Code, Input, Stack } from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'
import { useMutation } from '@tanstack/react-query'

import { CategoryCreateInput } from '@fc/types'

import { createCategoryWithMutation } from './utils'

export const CreateCategoryWithUseMutation = () => {
  const [name_en, setNameEn] = useState<string>('')
  const [name_tr, setNameTr] = useState<string>('')
  const [name_nl, setNameNl] = useState<string>('')
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    setSlug(slugify(name_en ?? ''))
  }, [name_en])

  const { mutate, data, isPending } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (data: CategoryCreateInput) => createCategoryWithMutation(data),
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();

    // TODO: Call mutate with category body
    const categoryData: CategoryCreateInput = {
      name_en,
      name_tr,
      name_nl,
      slug,
    }

    mutate(categoryData);
  }

  return (
    <Stack>
      <Code as={'pre'}>{JSON.stringify(data, null, 2)}</Code>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input
            placeholder="Category name (en)"
            value={name_en}
            onChange={e => setNameEn(e.target.value)}
          />
          <Input
            placeholder="Category name (tr)"
            value={name_tr}
            onChange={e => setNameTr(e.target.value)}
          />
          <Input
            placeholder="Category name (nl)"
            value={name_nl}
            onChange={e => setNameNl(e.target.value)}
          />
          <Input
            placeholder="Slug"
            value={slug}
            isReadOnly
          />
          <Button
            isLoading={isPending}
            loadingText={'Creating...'}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
