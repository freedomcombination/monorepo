import { useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/hooks'
import { Input, Group, InputElement } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDebounce } from 'react-use'

import { IconButton } from '@fc/chakra'

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
      onSearch?.(undefined)
    }
  }, [debouncedSearchTerm, onReset])

  return (
    <Group flex="1">
      <InputElement pointerEvents="none" color="gray.400">
        <HiOutlineSearch />
      </InputElement>

      <Input
        size="lg"
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={e =>
          e.key === 'Enter' && setSearchTerm((e.target as any).value)
        }
        {...rest}
      />
      <InputElement w="max-content" right={1}>
        {searchTerm.length > 1 && (
          <IconButton
            loading={isFetching}
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
      </InputElement>
    </Group>
  )
}
