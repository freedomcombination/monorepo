import { FC } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Skeleton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BiNotificationOff } from 'react-icons/bi'
import { FaArrowLeft, FaUser } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { HiMenu } from 'react-icons/hi'
import { MdOutlineNotifications } from 'react-icons/md'

import { useAuthContext, useWebPushContext } from '@fc/context'
import { useUnsubscribePushNotificationMutation } from '@fc/services'

import { AdminSidebar } from '../AdminSidebar'
import { CreateModelButton } from '../CreateModelButton'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { ProfilePanel } from '../ProfileSettings'
import { UserFeedback } from '../UserFeedback'

type AdminHeaderProps = {
  hasBackButton?: boolean
  title?: string
}

export const AdminHeader: FC<AdminHeaderProps> = ({ hasBackButton, title }) => {
  const { user, openAuthModal, loading } = useAuthContext()
  const { isSubscribed } = useWebPushContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure()
  const router = useRouter()
  const slugs = router.asPath.split('/')
  const parentSlug = slugs.slice(0, slugs.length - 1).join('/')

  const unsubscribeNotification = useUnsubscribePushNotificationMutation()

  const handleUnsubscribe = async () => {
    if (confirm('Are you sure you want to unsubscribe?')) {
      unsubscribeNotification.mutateAsync(undefined, {
        onSuccess: () => {
          // TODO: Refresh notification state
          console.log('Unsubscribed')
        },
        onError: () => {
          console.log('Error unsubscribing')
        },
      })
    }
  }

  return (
    <HStack
      px={4}
      justify="space-between"
      h={20}
      w={'full'}
      overflow={'hidden'}
    >
      <HStack minW={0}>
        {hasBackButton && (
          <Tooltip label={'Go back'}>
            <IconButton
              aria-label="back"
              icon={<FaArrowLeft />}
              rounded="full"
              onClick={() => router.push(`/${parentSlug}`)}
            />
          </Tooltip>
        )}
        {!loading && !hasBackButton && title && (
          <Heading size={{ base: 'lg', lg: 'xl' }} isTruncated>
            {title}
          </Heading>
        )}
        {loading && !title && <Skeleton noOfLines={1} w={40} />}
      </HStack>

      {/* TODO Create notification component */}
      <HStack flexShrink={0}>
        {user && (
          <>
            <IconButton
              aria-label="profile"
              icon={<FaGear />}
              variant="outline"
              rounded="full"
              colorScheme={'gray'}
              onClick={onOpenProfile}
            />
            <Modal
              isOpen={isOpenProfile}
              onClose={onCloseProfile}
              size={'5xl'}
              scrollBehavior={'inside'}
              isCentered
            >
              <ModalOverlay />
              <ModalContent p={0} h={'90vh'}>
                <ModalBody p={0}>
                  <ProfilePanel />
                </ModalBody>
                <ModalFooter bg={'primary.400'} />
              </ModalContent>
            </Modal>
          </>
        )}
        {user && (
          <IconButton
            aria-label="notifications"
            icon={<MdOutlineNotifications />}
            variant="outline"
            rounded="full"
            colorScheme={'gray'}
          />
        )}
        {process.env.VERCEL_ENV !== 'production' && isSubscribed && (
          <IconButton
            aria-label="notifications-off"
            icon={<BiNotificationOff />}
            variant="outline"
            rounded="full"
            colorScheme={'gray'}
            onClick={handleUnsubscribe}
          />
        )}
        <LanguageSwitcher responsive />
        <CreateModelButton />
        {!user && (
          <Button
            onClick={openAuthModal}
            colorScheme={'blue'}
            leftIcon={<FaUser />}
            rounded={'full'}
            loading={loading}
          >
            Login
          </Button>
        )}
        <IconButton
          aria-label="Open Menu"
          icon={<HiMenu />}
          variant="outline"
          colorScheme="gray"
          rounded={'full'}
          display={{ base: 'flex', lg: 'none' }}
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} onClose={onClose} placement={'right'}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody px={0}>
              <AdminSidebar mobile />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <UserFeedback />
      </HStack>
    </HStack>
  )
}
