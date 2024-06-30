import { Art, Collection } from '@fc/types'

export type ArtAddToCollectionCardProps = {
  isAdded: boolean
  isLoading: boolean
  art: Art
  onAdd: (art: Art) => void
  onRemove: (art: Art) => void
}

export type ArtAddToCollectionGridProps = {
  arts: Art[]
  collection: Collection
  onSuccess?: () => void
}

export type ArtAddToCollectionModalProps = {
  isOpen: boolean
  onClose: () => void
  collection: Collection
}
