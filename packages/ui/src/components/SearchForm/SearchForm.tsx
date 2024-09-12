import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'

import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { FaTimes } from 'react-icons/fa'
import { HiOutlineSearch } from 'react-icons/hi'

import { SearchFormProps } from './types'

export const SearchForm: React.FC<SearchFormProps> = ({
  placeholder,
  delay,
  onSearch,
  mode = 'change',
  isFetching,
  ...rest
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchTerm(e.target.value)

    if (mode === 'change') {
      debounce(() => onSearch(e.target.value), delay || 500)()
    }
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      onSearch(searchTerm)
    }
  }

  return (
    <InputGroup size="lg" flex="1">
      <InputLeftElement pointerEvents="none" color="gray.400">
        <HiOutlineSearch />
      </InputLeftElement>

      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        {...(mode === 'click' && { onKeyDown: handleKeyDown })}
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
  )
}
