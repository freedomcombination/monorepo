import { ComponentProps, PropsWithChildren } from 'react'

import { CenterProps } from '@chakra-ui/react'
import HTMLFlipBook from 'react-pageflip'

import type { Collection } from '@fc/types'

export interface CollectionBookProps {
  collection: Collection
  logo?: string
  flipboxProps?: Partial<ComponentProps<typeof HTMLFlipBook>>
}

export type PageProps = PropsWithChildren<CenterProps>

export interface CollectionPagesPops {
  collection: Collection
  pageBgGradient: string
}
