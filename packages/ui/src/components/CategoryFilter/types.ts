import { Category, StrapiLocale } from '@fc/types'

export type CategoryFilterProps = {
  categoryData: Partial<Category>[]
  debounce?: number
  initialCategories?: string[]
  loading: boolean
  locale: StrapiLocale
  title: string
  selectCategories: (categories: string[]) => void
  setLoading: (loading: boolean) => void
}
