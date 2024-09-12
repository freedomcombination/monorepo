import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
} from 'react'

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
  isFetching,
  ...rest
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchTerm(e.target.value)

    debounce(() => onSearch(e.target.value), delay || 500)()
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as ChangeEvent<HTMLInputElement>)
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
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
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
      </InputRightElement>
    </InputGroup>
  )
}
