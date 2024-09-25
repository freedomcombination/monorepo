import { Box, Grid } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useRouter } from 'next/router'

import { COLLECTION_MOCKS } from '@fc/mocks/collection'
import { useStrapiRequest } from '@fc/services/common/useStrapiRequest'
import type { Collection } from '@fc/types'

import { CollectionList } from './CollectionList'
import { CollectionListProps } from './types'

export default {
  component: CollectionList,
  title: 'Shared/CollectionList',
  args: {
    collectionData: COLLECTION_MOCKS.en.data,
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<CollectionListProps>

type Story = StoryObj<CollectionListProps>

const StoryWithHook: StoryFn<CollectionListProps> = args => {
  const router = useRouter()

  const { data } = useStrapiRequest<Collection>({
    endpoint: 'collections',
    locale: router.locale,
  })

  return (
    <Grid gridTemplateColumns="300px 1fr">
      <Box bg="gray.100" p={4}>
        <CollectionList collectionData={data?.data || args.collectionData} />
      </Box>
    </Grid>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
