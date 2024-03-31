import { FC, useEffect } from 'react'

import { Box, Button, chakra, Collapse, useBoolean } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { GoChevronDown } from 'react-icons/go'

import { NavLink } from './NavLink'
import { AdminNavItemProps } from './types'
import { Navigate } from '../../components'

export const AdminNavItem: FC<AdminNavItemProps> = ({
  label,
  link,
  submenu,
  icon,
}) => {
  const [open, setOpen] = useBoolean(false)

  const router = useRouter()

  const isMenuLinkActive =
    router.asPath === link || submenu?.some(item => item.link === router.asPath)

  useEffect(() => {
    if (isMenuLinkActive && submenu && !open) {
      setOpen.on()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuLinkActive, submenu])

  if (Array.isArray(submenu) && submenu.length === 0) {
    return null
  }

  return (
    <Box w="full">
      <NavLink
        href={link}
        justifyContent={'start'}
        leftIcon={icon}
        variant="ghost"
        color={'initial'}
        rounded="0"
        w="full"
        px={4}
        _hover={{ color: 'primary.500', bg: 'blackAlpha.50' }}
        {...(isMenuLinkActive && {
          color: 'primary.500',
          _hover: { color: 'primary.400', bg: 'blackAlpha.50' },
        })}
        isDisabled={!submenu && isMenuLinkActive}
        _disabled={{
          color: 'primary.500',
        }}
        {...(submenu && {
          onClick: setOpen.toggle,
          rightIcon: (
            <Box
              as={GoChevronDown}
              transition="all 0.2s"
              {...(open && {
                transform: 'rotate(180deg)',
              })}
            />
          ),
        })}
      >
        <chakra.span flex={1} textAlign="left">
          {label}
        </chakra.span>
      </NavLink>

      {/* Submenu */}
      {submenu && (
        <Collapse in={open}>
          {submenu?.map((item, index) => {
            const isSubmenuLinkActive = router.asPath === item.link
            const isExternal = item.link?.startsWith('http')

            return (
              <Box key={index}>
                <Navigate
                  href={item.link as string}
                  justifyContent="start"
                  key={item.link}
                  ml={8}
                  {...(isExternal && { isExternal, target: '_blank' })}
                >
                  <Button
                    justifyContent={'start'}
                    leftIcon={item.icon}
                    size="sm"
                    variant="ghost"
                    color={'initial'}
                    w="full"
                    px={2}
                    _hover={{ color: 'primary.500' }}
                    {...(isSubmenuLinkActive && {
                      isDisabled: true,
                      _disabled: {
                        color: 'primary.500',
                      },
                      color: 'primary.500',
                      _hover: { color: 'primary.400' },
                    })}
                  >
                    {item.label}
                  </Button>
                </Navigate>
              </Box>
            )
          })}
        </Collapse>
      )}
    </Box>
  )
}
