import { FC, ReactNode } from 'react'

import { HStack, Spacer, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { HiOutlineFilter } from 'react-icons/hi'
import { VscListFilter } from 'react-icons/vsc'

import {
  IconButton,
  MenuSeparator,
  MenuRoot,
  MenuTrigger,
  MenuContent,
} from '@fc/chakra'

import { SearchForm } from '../SearchForm'

type PageHeaderProps = {
  filterMenu?: ReactNode
  sortMenu?: ReactNode
  onSearch?: (value?: string) => number | void
  children?: ReactNode
  filterMenuCloseOnSelect?: boolean
  searchPlaceholder?: string
}

export const PageHeader: FC<PageHeaderProps> = ({
  filterMenu,
  sortMenu,
  onSearch,
  children,
  filterMenuCloseOnSelect,
  searchPlaceholder,
}) => {
  const { t } = useTranslation()

  const hasChildren =
    Boolean(children) ||
    Boolean(filterMenu) ||
    Boolean(sortMenu) ||
    typeof onSearch === 'function'

  if (!hasChildren) return null

  return (
    <HStack
      align="center"
      bg="white"
      px={4}
      py={2}
      shadow="base"
      rounded={'sm'}
    >
      {typeof onSearch === 'function' ? (
        <SearchForm
          onSearch={onSearch}
          variant="flushed"
          placeholder={searchPlaceholder || (t('search') as string)}
        />
      ) : (
        <Spacer />
      )}

      {filterMenu && (
        <MenuRoot closeOnSelect={filterMenuCloseOnSelect} lazyMount>
          <MenuTrigger value="page-header-filter-menu" asChild>
            <IconButton
              aria-label="Open filter menu"
              icon={<HiOutlineFilter />}
              variant="outline"
              rounded="full"
              colorPalette="gray"
            />
          </MenuTrigger>
          <MenuContent
            css={{
              '& .chakra-menu__group': {
                maxH: 200,
                overflowY: 'auto',
              },
              '& .chakra-menu__group__title': {
                position: 'sticky',
                top: 0,
                bg: 'white',
              },
            }}
          >
            <Stack separator={<MenuSeparator />}>{filterMenu}</Stack>
          </MenuContent>
        </MenuRoot>
      )}

      {sortMenu && (
        <MenuRoot lazyMount>
          <MenuTrigger asChild value="page-header-sort-menu">
            <IconButton
              aria-label="Open sort menu"
              icon={<VscListFilter />}
              variant="outline"
              rounded="full"
              colorPalette="gray"
            />
          </MenuTrigger>
          <MenuContent>{sortMenu}</MenuContent>
        </MenuRoot>
      )}
      {children}
    </HStack>
  )
}
