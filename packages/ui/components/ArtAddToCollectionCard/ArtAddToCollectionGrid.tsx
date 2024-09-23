import { useState } from 'react'

import { SimpleGrid } from '@chakra-ui/react'

import { useUpdateModelMutation } from '@fc/services/common/update'
import type { Art } from '@fc/types'

import { ArtAddToCollectionCard } from './ArtAddToCollectionCard'
import { ArtAddToCollectionGridProps } from './types'
import { WConfirm, WConfirmProps } from '../WConfirm'

export const ArtAddToCollectionGrid = ({
  arts,
  collection,
  onSuccess,
}: ArtAddToCollectionGridProps) => {
  const [artToBeMutated, setArtToBeMutated] = useState<Art | null>(null)
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const updateArtMutation = useUpdateModelMutation('arts')

  const handleAdd = (art: Art) => {
    setArtToBeMutated(art)
    updateArtMutation.mutate(
      {
        id: art.id,
        collection: collection.id,
      },
      {
        onSuccess,
      },
    )
  }

  const handleRemove = (art: Art) => {
    setArtToBeMutated(art)

    setConfirmState({
      title: 'Remove art',
      description: 'Are you sure you want to remove this art?',
      buttonText: 'Remove',
      isWarning: true,
      onConfirm: async () => {
        updateArtMutation.mutate(
          {
            id: art.id,
            collection: null,
          },
          {
            onSuccess: async () => {
              onSuccess?.()
              setConfirmState(undefined)
            },
          },
        )
      },
    })
  }

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <SimpleGrid gap={8} columns={{ base: 1, md: 2, lg: 4 }}>
        {arts.map(art => {
          const isAdded = art.collection?.id === collection.id

          const loading =
            artToBeMutated?.id === art.id && updateArtMutation.isPending

          return (
            <ArtAddToCollectionCard
              isAdded={isAdded}
              loading={loading}
              key={art.id}
              art={art}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          )
        })}
      </SimpleGrid>
    </>
  )
}
