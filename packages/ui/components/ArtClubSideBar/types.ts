import type { Category } from '@fc/types'

export type ArtSideBarProps = {
  categoryList: Category[]
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}
