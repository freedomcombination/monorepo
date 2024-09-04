import { Icon } from '@chakra-ui/react'
import { FaCheck, FaTimesCircle } from 'react-icons/fa'

import { Role, User } from '@fc/types'

import { WTableProps } from '../../components'

export const useUserColumns = (): WTableProps<User>['columns'] => {
  return [
    {
      accessorKey: 'username',
      sortable: true,
    },
    {
      accessorKey: 'email',
      sortable: true,
    },
    {
      accessorKey: 'role',
      transform: value => (value as Role)?.name,
      sortable: true,
      sortKey: 'type',
    },
    {
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
    {
      accessorKey: 'confirmed',
      cellProps: {
        textAlign: 'center',
      },
      transform: value =>
        value ? (
          <Icon as={FaCheck} color="green.500" />
        ) : (
          <Icon as={FaTimesCircle} color="red.500" />
        ),
      transformPDF: value => (value ? 'Yes' : 'No'),
    },
    {
      accessorKey: 'blocked',
      cellProps: {
        textAlign: 'center',
      },
      transform: value => value && <Icon as={FaTimesCircle} color="red.500" />,
      transformPDF: value => (value ? 'Blocked' : 'Active'),
    },
  ]
}
