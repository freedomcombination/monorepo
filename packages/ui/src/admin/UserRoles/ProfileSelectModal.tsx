import { FC, useEffect, useState } from 'react'

import {
  Button,
  Flex,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  IconButton,
  Stack,
  Highlight,
  Tooltip,
  SimpleGrid,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaInfoCircle, FaSave } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

import { useAuthContext } from '@fc/context'
import { mutation } from '@fc/lib/src/mutation/mutation'
import { useStrapiRequest } from '@fc/services'
import { StrapiRole, UpdateUserInput, User } from '@fc/types'
import { toastMessage } from '@fc/utils'

type ProfileSelectModalProps = {
  role?: StrapiRole
  onClose: () => void
  onCloseComplete: () => void
  refetchRoles: () => void
  isOpen: boolean
}

export const ProfileSelectModal: FC<ProfileSelectModalProps> = ({
  role,
  onClose,
  onCloseComplete,
  refetchRoles,
  isOpen,
}) => {
  const { t } = useTranslation()
  const { token } = useAuthContext()
  const [userFilter, setUserFilter] = useState<string>('')
  const [pendingUser, setPendingUser] = useState<User[]>([])
  const [saveUsers, setSaveUsers] = useState<boolean>(false)

  const usersResponse = useStrapiRequest<User>({
    endpoint: 'users',
    token: token ?? '',
    fields: ['id', 'username', 'email'],
  })

  const handleOnClose = () => {
    setUserFilter('')
    setPendingUser([])
    onCloseComplete()
  }

  useEffect(() => {
    if (!saveUsers || !role) return

    const saveAsync = async () => {
      for (const user of pendingUser) {
        try {
          await mutation<User, UpdateUserInput>({
            endpoint: 'users',
            method: 'put',
            token: token ?? '',
            id: user.id,
            body: {
              role: role.id,
            },
          })
        } catch (error) {
          console.log(error)
          continue
        }
        setPendingUser(prev => prev.filter(u => u.id !== user.id))
        user.role = { id: role.id } as StrapiRole // just move until refetch...
      }
      usersResponse.refetch()
      refetchRoles()
    }

    saveAsync().finally(() => setSaveUsers(false))

    return () => setSaveUsers(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveUsers])

  if (!role) return null

  const users = usersResponse?.data?.data ?? []
  const roleId = role.id

  const usersWithRole = users.filter(user => user.role?.id === roleId)
  const usersLeft = users.filter(
    user => !(user.role?.id === roleId) && !pendingUser.includes(user),
  )
  const usersFiltered = usersLeft.filter(
    user =>
      user.username.includes(userFilter) || user.email.includes(userFilter),
  )

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={handleOnClose}
      size={'4xl'}
      scrollBehavior={'inside'}
      closeOnOverlayClick={!saveUsers}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{role.name}</ModalHeader>
        {!saveUsers && <ModalCloseButton />}
        <ModalBody>
          <SimpleGrid columns={3} gap={2}>
            {/* all users */}
            <Flex
              flex={1}
              direction={'column'}
              gap={2}
              borderColor={'gray.100'}
              h={500}
              borderWidth={1}
              p={4}
              rounded={'md'}
            >
              <Input
                value={userFilter}
                onChange={e => setUserFilter(e.target.value)}
                placeholder={t('search')}
              />
              <List overflowX={'hidden'} overflowY={'auto'} spacing={2}>
                {usersFiltered.map((user, index) => (
                  <CustomListItem
                    key={index}
                    user={user}
                    filter={userFilter}
                    onClick={() => setPendingUser(prev => [...prev, user])}
                  />
                ))}
              </List>
            </Flex>

            {/* pending users */}
            <VStack
              gap={2}
              flex={1}
              borderColor={'gray.100'}
              h={500}
              borderWidth={1}
              p={4}
              rounded={'md'}
            >
              <Text>Pending:</Text>
              <List overflowX={'hidden'} overflowY={'auto'} spacing={2}>
                {pendingUser.map((user, index) => (
                  <CustomListItem
                    key={index}
                    user={user}
                    onClick={() => {
                      setPendingUser(prev => prev.filter(u => u.id !== user.id))
                    }}
                  />
                ))}
              </List>
            </VStack>

            {/* assigned users */}
            <VStack
              gap={2}
              flex={1}
              borderColor={'gray.100'}
              h={500}
              borderWidth={1}
              p={4}
              rounded={'md'}
            >
              <Text>Assigned:</Text>
              <List overflowX={'hidden'} overflowY={'auto'} spacing={2}>
                {usersWithRole.map((user, index) => (
                  <CustomListItem
                    key={index}
                    user={user}
                    onClick={() => {
                      // users has to have role...
                      // this list is only for display
                      toastMessage(
                        'Info',
                        'A user without role can cause issues, A role can not be removed',
                        'info',
                      )
                    }}
                  />
                ))}
              </List>
            </VStack>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter gap={6}>
          <Button leftIcon={<FaX />} onClick={onClose} isDisabled={saveUsers}>
            {t('cancel')}
          </Button>
          <Button
            leftIcon={<FaSave />}
            onClick={() => setSaveUsers(true)}
            isLoading={saveUsers}
            loadingText="..."
            isDisabled={pendingUser.length === 0}
          >
            {t('save')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const CustomListItem = ({
  user,
  onClick,
  filter,
}: {
  user: User
  onClick: () => void
  filter?: string
}) => {
  return (
    <ListItem
      onClick={onClick}
      p={2}
      cursor={'pointer'}
      alignItems={'center'}
      _hover={{ bg: 'gray.100', rounded: 'md' }}
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
    >
      <Stack flexShrink={1} flexGrow={1} overflow={'hidden'}>
        <Text noOfLines={1}>
          {filter ? (
            <Highlight
              query={filter}
              styles={{ rounded: 'md', bg: 'yellow.100' }}
            >
              {user.username}
            </Highlight>
          ) : (
            user.username
          )}
        </Text>
        <Text fontSize={'xs'} noOfLines={1}>
          {filter ? (
            <Highlight
              query={filter}
              styles={{ rounded: 'md', bg: 'yellow.100' }}
            >
              {user.email}
            </Highlight>
          ) : (
            user.email
          )}
        </Text>
      </Stack>
      {user.role && (
        <Tooltip label={user.role.name}>
          <IconButton
            variant={'ghost'}
            rounded={'full'}
            size={'sm'}
            icon={<FaInfoCircle />}
            aria-label={'info'}
          />
        </Tooltip>
      )}
    </ListItem>
  )
}
