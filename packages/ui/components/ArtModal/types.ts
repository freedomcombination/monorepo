import type { Art } from '@fc/types'

export type ArtModalProps = {
  art: Art
  isOpen: boolean
  onClose: () => void
  refetch?: () => void
}
