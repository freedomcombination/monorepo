import { FC, ReactNode } from 'react'

import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { HiOutlineFilter } from 'react-icons/hi'
import { VscListFilter } from 'react-icons/vsc'

import { SearchForm } from '../../components'

export type PageHeaderProps = {
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
            colorScheme="gray"
          />
          <MenuList
            as={Stack}
            divider={<MenuDivider />}
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
            {filterMenu}
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
            colorScheme="gray"
          />
          <MenuList>{sortMenu}</MenuList>
        </Menu>
      )}
      {children}
    </HStack>
  )
}
