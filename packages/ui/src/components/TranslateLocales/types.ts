import { StrapiLocale } from '@fc/types'

export type EntryInputProps = {
  locale: StrapiLocale
  localeKey: string
}

export type TranslateLocalesProps = {
  searchTerm?: string
}

export type EditEntryProps = {
  name: string
  value: PriorityFilter
}

export type Dict = Record<string, string>
export type PriorityKey = {
  key: string
  priority: PriorityFilter
}

export type DictContextProps = {
  keysToDelete: string[]
  keysWarningSuppressed: string[]
  toggleWillDelete: (name: string) => void
  toggleSuppressWarning: (name: string) => void
  locked: boolean
}

export enum PriorityFilter {
  TRANSLATED = 0,
  IDENTICAL = 1,
  MISSING = 2,
  ALL = -1,
  IGNORED = -2,
}
