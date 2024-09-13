import { Category } from '@fc/types'

export type ArtSideBarProps = {
  categoryList: Category[]
  loading: boolean
  setLoading: (isLoading: boolean) => void
}
