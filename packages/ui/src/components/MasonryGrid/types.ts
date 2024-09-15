import { ReactNode } from 'react'

export type MasonryGridProps = {
  gap?: number
  columnGap?: number
  rowGap?: number
  cols?: Array<number>
  children: ReactNode
}
