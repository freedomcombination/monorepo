import { FC, useEffect, useRef } from 'react'

import {
  Separator,
  HStack,
  Spinner,
  Stack,
  Text,
  useCheckboxGroup,
} from '@chakra-ui/react'
import { RiFilterOffLine } from 'react-icons/ri'
import { useDebounce } from 'react-use'

import { IconButton } from '@fc/chakra'

import { CategoryFilterCheckbox } from './CategoryFilterCheckbox'
import { CategoryFilterProps } from './types'

export const CategoryFilter: FC<CategoryFilterProps> = ({
  categoryData = [],
  debounce = 1000,
  initialCategories = [],
  loading,
  locale,
  title,
  selectCategories,
  setLoading,
}) => {
  const initialCategorySelected = useRef(false)

  const initialCategoriesQuery = initialCategories
    ?.map((category, index) => `${index}=${category}`)
    .join('&')

  const { value, setValue } = useCheckboxGroup({
    defaultValue: initialCategories,
  })

  useEffect(() => {
    if (initialCategoriesQuery && !initialCategorySelected.current) {
      initialCategorySelected.current = true
      const categoriesQuery = initialCategoriesQuery
        .split('&')
        .map(c => c.split('=')[1])
      setLoading(true)
      setValue(categoriesQuery)
    }
  }, [initialCategoriesQuery, setValue, setLoading])

  useEffect(() => {
    setLoading(true)
  }, [value, setLoading])

  useDebounce(
    () => {
      setLoading(false)
      selectCategories(value as string[])
    },
    debounce,
    [value],
  )

  return (
    <Stack justify="stretch" w="full" gap={1}>
      <HStack py={1.5} w="full" justify="space-between" align="center">
        <Text fontWeight={600}>{title}</Text>
        {loading ? (
          <Spinner size="lg" color="primary.500" />
        ) : (
          <IconButton
            disabled={!value[0]}
            aria-label="clear filter"
            rounded="full"
            size="sm"
            icon={<RiFilterOffLine />}
            onClick={() => setValue([])}
          />
        )}
      </HStack>
      <Separator />
      {categoryData?.map(category => (
        <CategoryFilterCheckbox
          key={category.id}
          id={`${category.id}`}
          name={category[`name_${locale}`]}
          label={category[`name_${locale}`]}
          checked={value.includes(category.slug ?? '')}
          value={category.slug}
        />
      ))}
    </Stack>
  )
}
