import { FC, ReactNode } from 'react'

import { HStack, IconButton, Spacer, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { HiOutlineFilter } from 'react-icons/hi'
import { VscListFilter } from 'react-icons/vsc'

import { Menu, MenuButton, MenuDivider, MenuList } from '../Menu'
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
        <Menu
          closeOnSelect={filterMenuCloseOnSelect}
          isLazy
          lazyBehavior="keepMounted"
        >
          <MenuButton
            aria-label="Open filter menu"
            as={IconButton}
            icon={<HiOutlineFilter />}
            variant="outline"
            rounded="full"
            colorPalette="gray"
          />
          <MenuList
            sx={{
              '.chakra-menu__group': {
                maxH: 200,
                overflowY: 'auto',
              },
              '.chakra-menu__group__title': {
                position: 'sticky',
                top: 0,
                bg: 'white',
              },
            }}
          >
            <Stack divider={<MenuDivider />}>{filterMenu}</Stack>
          </MenuList>
        </Menu>
      )}

      {sortMenu && (
        <Menu isLazy lazyBehavior="keepMounted">
          <MenuButton
            aria-label="Open sort menu"
            as={IconButton}
            icon={<VscListFilter />}
            variant="outline"
            rounded="full"
            colorPalette="gray"
          />
          <MenuList>{sortMenu}</MenuList>
        </Menu>
      )}
      {children}
    </HStack>
  )
}
