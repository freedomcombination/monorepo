import { useState } from 'react'

import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useUpdateEffect,
} from '@chakra-ui/react'
import { InputProps } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDebounce } from 'react-use'

/**
 * @param mode "change | click"
 */
export type SearchFormProps = {
  delay?: number
  onSearch: (value: string | null) => void
  onReset?: () => void
  mode?: 'change' | 'click'
  isFetching?: boolean
} & InputProps

export const SearchForm: React.FC<SearchFormProps> = ({
  placeholder,
  delay,
  onSearch,
  onReset,
  mode = 'change',
  isFetching,
  ...rest
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm)
    },
    delay || 700,
    [searchTerm],
  )

  // `useUpdateEffect` is used here because we don't need to call `onSearch` at the first render
  // We call `onSearch` only if  mode is `change` and the debouncedSearchTerm's lenght is greater than 2
  useUpdateEffect(() => {
    if (mode === 'change' && debouncedSearchTerm.length > 2) {
      onSearch?.(debouncedSearchTerm)
    }
    if (debouncedSearchTerm === '') {
      onSearch?.(null)
    }
  }, [debouncedSearchTerm, onSearch, onReset])

  return (
    <InputGroup size="lg" flex="1">
      <InputLeftElement pointerEvents="none" color="gray.400">
        <HiOutlineSearch />
      </InputLeftElement>

      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={e =>
          e.key === 'Enter' && setSearchTerm((e.target as any).value)
        }
        {...rest}
      />
      <InputRightElement w="max-content" right={1}>
        {searchTerm.length > 1 && (
          <IconButton
            isLoading={isFetching}
            variant="ghost"
            icon={<FaTimes color="gray.400" />}
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          />
        )}
        {mode === 'click' && (
          <IconButton
            colorScheme="primary"
            onClick={() => onSearch(searchTerm)}
            icon={<HiOutlineSearch />}
            aria-label="Search"
          />
        )}
      </InputRightElement>
    </InputGroup>
  )
}
