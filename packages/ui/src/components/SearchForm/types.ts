import { InputProps } from '@chakra-ui/react'

export type SearchFormProps = {
  delay?: number
  onSearch: (value?: string) => void
  onReset?: () => void
  isFetching?: boolean
} & InputProps
