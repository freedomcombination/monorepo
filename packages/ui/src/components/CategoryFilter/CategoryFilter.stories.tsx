import { useEffect, useState } from 'react'

import {
  Box,
  Center,
  Code,
  Grid,
  Heading,
  HStack,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { CATEGORY_MOCKS } from '@fc/mocks'

import { CategoryFilter } from './CategoryFilter'
import { CategoryFilterProps } from './types'
import { useChangeParams } from '../../hooks'

export default {
  component: CategoryFilter,
  title: 'Shared/CategoryFilter',
  args: {
    categoryData: CATEGORY_MOCKS.data,
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<CategoryFilterProps>

type Story = StoryObj<CategoryFilterProps>

const StoryWithHook: StoryFn<CategoryFilterProps> = args => {
  const changeParam = useChangeParams()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { locale } = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    changeParam({ categories: selectedCategories })
  }, [selectedCategories, changeParam])

  const { query } = useRouter()

  const [initialCategories] = [
    (query['categories'] as string)
      ?.split('&')
      .map(category => category.split('=')[1]),
  ]

  return (
    <Grid gridTemplateColumns="300px 1fr">
      <Box bg="gray.100" p={4}>
        <CategoryFilter
          {...args}
          initialCategories={args.initialCategories || initialCategories}
          isLoading={args.isLoading || isLoading}
          locale={args.locale || locale}
          title={args.title || t('categories')}
          setIsLoading={setIsLoading}
          selectCategories={setSelectedCategories}
        />
      </Box>
      <Center>
        <VStack>
          <Heading size="md">Selected Categories</Heading>
          <HStack>
            {isLoading && <Spinner />}
            <Code>{JSON.stringify(selectedCategories, null, 2)}</Code>
          </HStack>
        </VStack>
      </Center>
    </Grid>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}

export const InitialCategories: Story = {
  render: StoryWithHook,
  parameters: {
    nextjs: {
      router: {
        query: {
          categories: '0=painting&1=nature',
        },
      },
    },
  },
}

export const Debounced: Story = {
  render: StoryWithHook,
  args: {
    debounce: 3000,
  },
}
