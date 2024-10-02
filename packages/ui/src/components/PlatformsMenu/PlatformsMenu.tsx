import { FC } from 'react'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  IconButton,
  SimpleGrid,
  Box,
  Image,
  Link,
  Portal,
} from '@chakra-ui/react'
import { PiDotsNineBold } from 'react-icons/pi'

import { useAuthContext } from '../../../../context/src/auth/useAuthContext'

type PlatformsMenuProps = {
  authenticated?: boolean
  userRole?: string
}

export const PlatformsMenu: FC<PlatformsMenuProps> = ({ userRole }) => {
  const { site } = useAuthContext()

  if (
    site !== 'foundation' ||
    userRole === 'authenticated' ||
    userRole === 'public'
  ) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="Platforms Menu"
          icon={<PiDotsNineBold />}
          variant="ghost"
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="250px">
          <PopoverArrow />
          <PopoverHeader>Platforms</PopoverHeader>
          <PopoverBody>
            <SimpleGrid columns={2} spacing={4}>
              <Box textAlign="center">
                <Link
                  href="https://dashboard.freedomcombination.com"
                  isExternal
                >
                  <Image
                    src="https://dashboard.freedomcombination.com/images/foundation-logo.svg"
                    alt="Foundation Logo"
                  />
                  Dashboard
                </Link>
              </Box>
              <Box textAlign="center">
                <Link href="https://kunsthalte.com" isExternal>
                  <Image
                    src="https://www.kunsthalte.com/images/kunsthalte-logo.svg"
                    alt="Kunsthalte Logo"
                  />
                  Kunsthalte
                </Link>
              </Box>
              <Box textAlign="center">
                <Link href="https://lotusvdmedia.com" isExternal>
                  <Image src="lotusvmedia.png" alt="Lotus Logo" />
                  Lotus
                </Link>
              </Box>
              <Box textAlign="center">
                <Link href="https://trendrights.com" isExternal>
                  <Image
                    src="https://www.trendrights.com/images/trend-rights-logo-light.svg"
                    alt="Trend Rights Logo"
                  />
                  Trend Rights
                </Link>
              </Box>
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
