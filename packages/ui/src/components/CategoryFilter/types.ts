import { Category, StrapiLocale } from '@fc/types'

export type CategoryFilterProps = {
  categoryData: Partial<Category>[]
  debounce?: number
  initialCategories?: string[]
  isLoading: boolean
  locale: StrapiLocale
  title: string
  selectCategories: (categories: string[]) => void
  setIsLoading: (isLoading: boolean) => void
}
