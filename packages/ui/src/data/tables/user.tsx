import { Icon } from '@chakra-ui/react'
import { FaCheck, FaTimesCircle } from 'react-icons/fa'

import { StrapiRole, User } from '@fc/types'

import { WTableProps } from '../../components'

export const useUserColumns = (): WTableProps<User>['columns'] => {
  return {
    username: { sortable: true },
    email: { sortable: true },
    role: {
      transform: value => (value as StrapiRole)?.name,
      sortable: true,
      sortKey: 'type',
    },
    createdAt: {
      type: 'date',
      sortable: true,
    },
    confirmed: {
      cellProps: {
        textAlign: 'center',
      },
      transform: value =>
        value ? (
          <Icon as={FaCheck} color="green.500" />
        ) : (
          <Icon as={FaTimesCircle} color="red.500" />
        ),
    },
    blocked: {
      cellProps: {
        textAlign: 'center',
      },
      transform: value => value && <Icon as={FaTimesCircle} color="red.500" />,
    },
  }
}
