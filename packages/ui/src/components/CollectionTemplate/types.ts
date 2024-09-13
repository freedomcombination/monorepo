import { LegacyRef } from 'react'

import { Collection } from '@fc/types'

export type CollectionTemplateProps = {
  loading: boolean
  height: number
  width: number
  pageShow: number
  collection: Collection
  centerRef?: LegacyRef<HTMLDivElement>
}
