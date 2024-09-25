import { FC } from 'react'

import { ChildMenuItem } from './ChildMenuItem'
import { ParentMenuItem } from './ParentMenuItem'
import { HeaderNavItemProps } from './types'

export const HeaderNavItem: FC<HeaderNavItemProps> = ({ item, isDark }) => {
  const isParentLink = !!item.children

  if (isParentLink) {
    return <ParentMenuItem item={item} isDark={isDark} isMobile={false} />
  }

  return <ChildMenuItem item={item} isDark={isDark} isMobile={false} />
}
