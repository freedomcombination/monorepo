import { FC } from 'react'

import { useDisclosure } from '@chakra-ui/hooks'
import { HStack } from '@chakra-ui/react'
import { FaBars } from 'react-icons/fa'

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  IconButton,
} from '@fc/chakra'

import { HeaderMobileNav } from './HeaderMobileNav'
import { ProfileMenu } from './ProfileMenu'
import { HeaderMobileProps } from './types'
import { useScroll } from '../../hooks'
import { LocaleSwitcher } from '../LocaleSwitcher'

export const HeaderMobile: FC<HeaderMobileProps> = ({
  isDark,
  headerMenu,
  hasProfile,
  isLoggedIn,
}) => {
  const { open, onToggle } = useDisclosure()
  const isScrolled = useScroll()

  return (
    <HStack display={{ base: 'flex', lg: 'none' }}>
      <Drawer open={open} onOpenChange={onToggle}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <HeaderMobileNav headerMenu={headerMenu} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <LocaleSwitcher isDark={isDark} />
      {hasProfile && (
        <ProfileMenu isLoggedIn={isLoggedIn} isDark={isDark} isMobile />
      )}
      <IconButton
        variant="outline"
        color={!isScrolled && isDark ? 'white' : 'primary.500'}
        colorPalette={!isScrolled && isDark ? 'whiteAlpha' : 'primary'}
        borderColor={!isScrolled && isDark ? 'white' : 'primary.500'}
        size={'sm'}
        onClick={onToggle}
        aria-label="menu"
        icon={<FaBars />}
      />
    </HStack>
  )
}
