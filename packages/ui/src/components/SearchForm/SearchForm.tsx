import { useState } from 'react'

import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useUpdateEffect,
} from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDebounce } from 'react-use'

import { SearchFormProps } from './types'

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
  const [noResults, setNoResults] = useState(false)
  // State that controls if any results after search
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm)
    },
    delay || 700,
    [searchTerm],
  )

  // `useUpdateEffect` is used here because we don't need to call `onSearch` at the first render
  // We call `onSearch` only if  mode is `change` and the debouncedSearchTerm's lenght is greater than 2
  // Added result for to check return length of search terms.
  useUpdateEffect(() => {
    if (mode === 'change' && debouncedSearchTerm.length > 2) {
      const result = onSearch?.(debouncedSearchTerm)
    }
    if (result && result.length === 0) {
      setNoResults(true)
    } else {
      setNoResults(false)
    }
    if (debouncedSearchTerm === '') {
      onSearch?.(undefined)
      setNoResults(false)
    }
  }, [debouncedSearchTerm, onReset])

  return (
    <div>
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
            onClick={() => onSearch(searchTerm)}
            icon={<HiOutlineSearch />}
            aria-label="Search"
          />
        )}
      </InputRightElement>
    </InputGroup>
    {noResults && (
      <p style={{ marginTop: '10px', color: 'red' }}>
          Hiçbir şey bulunamadı
      </p>
      )}
    </div>
  )
}
