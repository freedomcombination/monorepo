import { FC, useContext } from 'react'

import { Group, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { BiHide } from 'react-icons/bi'
import { FaExclamationTriangle } from 'react-icons/fa'
import { FaCheck, FaCheckDouble, FaTrash } from 'react-icons/fa6'
import { IoMdRemoveCircleOutline } from 'react-icons/io'

import { IconButton } from '@fc/chakra'

import { DictContext } from './DictContext'
import { EntryInput } from './EntryInput'
import { EditEntryProps, PriorityFilter } from './types'

export const EditEntry: FC<EditEntryProps> = ({ name, value }) => {
  const {
    keysToDelete,
    keysWarningSuppressed,
    toggleSuppressWarning,
    toggleWillDelete,
    locked,
  } = useContext(DictContext)

  const isSuppressed = keysWarningSuppressed.includes(name)
  const isPendingDeletion = keysToDelete.includes(name)

  const colors: Partial<Record<PriorityFilter, string>> = {
    [PriorityFilter.TRANSLATED]: 'green',
    [PriorityFilter.IDENTICAL]: 'orange',
    [PriorityFilter.MISSING]: 'purple',
    [PriorityFilter.IGNORED]: 'gray',
  }

  const icons: Partial<Record<PriorityFilter, IconType>> = {
    [PriorityFilter.TRANSLATED]: FaCheckDouble,
    [PriorityFilter.IDENTICAL]: FaExclamationTriangle,
    [PriorityFilter.MISSING]: IoMdRemoveCircleOutline,
    [PriorityFilter.IGNORED]: BiHide,
  }

  const color = colors[value]
  const Icon = icons[value] || FaCheck

  const toggleDelete = () => {
    toggleWillDelete(name)
  }

  const toggleSuppress = () => {
    toggleSuppressWarning(name)
  }

  return (
    <Stack gap={2} mt={2} mr={2}>
      <HStack color={color} gap={1} alignItems={'center'} position={'relative'}>
        <Icon />
        <Text
          fontWeight={600}
          mb={0}
          fontSize={'sm'}
          {...(isPendingDeletion && { textDecoration: 'line-through' })}
        >
          {name}
        </Text>
      </HStack>
      <HStack>
        <SimpleGrid columns={3} gap={4} flex={1}>
          <EntryInput locale={'en'} localeKey={name} />
          <EntryInput locale={'nl'} localeKey={name} />
          <EntryInput locale={'tr'} localeKey={name} />
        </SimpleGrid>
        <Group attached colorPalette={isSuppressed ? 'red' : 'gray'}>
          <IconButton
            icon={<FaTrash />}
            size="sm"
            disabled={locked}
            aria-label="delete"
            variant={isPendingDeletion ? 'solid' : 'outline'}
            onClick={toggleDelete}
          />

          <IconButton
            icon={<BiHide />}
            size="sm"
            aria-label="hide"
            variant={isSuppressed ? 'solid' : 'outline'}
            disabled={
              !isSuppressed &&
              (isPendingDeletion || value !== PriorityFilter.IDENTICAL)
            }
            onClick={toggleSuppress}
          />
        </Group>
      </HStack>
    </Stack>
  )
}
