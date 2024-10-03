import type { StrapiLocale } from '@fc/types'

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
  reValidate: (key?: string) => void
  valueEN: (key: string) => string
  valueTR: (key: string) => string
  valueNL: (key: string) => string
}

export enum PriorityFilter {
  TRANSLATED = 0,
  IDENTICAL = 1,
  MISSING = 2,
  NEW = 3,
  ALL = -1,
  IGNORED = -2,
}
