import { Art } from '@fc/types'

import { WImageProps } from '../WImage'

export type ArtCardImageProps = Partial<Pick<WImageProps, 'h' | 'height'>> & {
  art: Art
  isMasonry?: boolean
}
