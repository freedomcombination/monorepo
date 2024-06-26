import { useState } from 'react'

import { SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useMutation } from '@tanstack/react-query'
import { sample, shuffle } from 'lodash'

import { ART_MOCKS } from '@fc/mocks'
import { Art, Collection } from '@fc/types'
import { sleep } from '@fc/utils'

import { ArtAddToCollectionCard } from './ArtAddToCollectionCard'
import { ArtAddToCollectionCardProps } from './types'

const COLLECTION_MOCK: Collection = {
  id: 1,
  title: 'Collection 1',
  slug: 'collection-1',
  approvalStatus: 'pending',
  locale: 'tr',
  description: 'Collection 1',
  content: 'Collection Content 1',
  date: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
  arts: shuffle(ART_MOCKS.data).slice(0, 3),
}

export default {
  title: 'Admin/ArtAddToCollectionCard',
  component: ArtAddToCollectionCard,
  args: {
    art: sample(ART_MOCKS.data),
  },
} as Meta<ArtAddToCollectionCardProps>

type Story = StoryObj<ArtAddToCollectionCardProps>

export const Default: Story = {}

const StoryWithHooks: StoryFn<ArtAddToCollectionCardProps> = args => {
  const [collection, setCollection] = useState<Collection>(COLLECTION_MOCK)
  const [artToBeMutated, setArtToBeMutated] = useState<Art | null>(null)

  const addMutation = useMutation({
    mutationKey: ['add-art-to-collection', collection.id],
    mutationFn: async (art: Art) => {
      await sleep(1000)

      setCollection({
        ...collection,
        arts: [...(collection.arts || []), art],
      })
    },
  })

  const removeMutation = useMutation({
    mutationKey: ['remove-art-from-collection', collection.id],
    mutationFn: async (art: Art) => {
      await sleep(1000)

      setCollection({
        ...collection,
        arts: collection.arts?.filter(a => a.id !== art.id),
      })
    },
  })

  const handleAdd = (art: Art) => {
    setArtToBeMutated(art)
    addMutation.mutate(art)
  }

  const handleRemove = (art: Art) => {
    setArtToBeMutated(art)
    removeMutation.mutate(art)
  }

  return (
    <Stack>
      <Text p={4} pos="sticky" top={0} bg="white" zIndex={1}>
        Collection has {collection.arts?.length} arts
      </Text>
      <SimpleGrid minChildWidth="300px" spacing="10px">
        {ART_MOCKS.data.map(art => {
          const isAdded = collection.arts?.some(a => a.id === art.id) || false
          const isLoading =
            artToBeMutated?.id === art.id &&
            (addMutation.isPending || removeMutation.isPending)

          return (
            <ArtAddToCollectionCard
              key={art.id}
              {...args}
              isAdded={isAdded}
              isLoading={isLoading}
              art={art}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          )
        })}
      </SimpleGrid>
    </Stack>
  )
}

export const Grid: Story = {
  render: StoryWithHooks,
}
