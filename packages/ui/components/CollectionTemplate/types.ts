import { LegacyRef } from 'react'

import type { Collection } from '@fc/types'

export type CollectionTemplateProps = {
  isLoading: boolean
  height: number
  width: number
  pageShow: number
  collection: Collection
  centerRef?: LegacyRef<HTMLDivElement>
}
