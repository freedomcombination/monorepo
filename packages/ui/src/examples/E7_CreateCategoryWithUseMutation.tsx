/* eslint-disable @typescript-eslint/no-unused-vars */

import { FormEventHandler, useEffect, useState } from 'react'

import { Code, Input, Stack } from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'
import { useMutation } from '@tanstack/react-query'

import { CategoryCreateInput } from '@fc/types'
import { Button } from '@fc/ui'

import { createCategoryWithMutation } from './utils'

export const CreateCategoryWithUseMutation = () => {
  const [name_en, setNameEn] = useState<string>('')
  const [name_tr, setNameTr] = useState<string>('')
  const [name_nl, setNameNl] = useState<string>('')
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    // TODO: Update slug with slugify on name_en change
  }, [])

  const { mutate, data, isPending } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (data: CategoryCreateInput) => createCategoryWithMutation(data),
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    // TODO: Call mutate with category body
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
          {/* TODO: Add all inputs */}

          <Button isLoading={isPending} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
