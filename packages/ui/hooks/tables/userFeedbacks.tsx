import { Icon } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'

import type { UserFeedback } from '@fc/types'

import { WTableProps } from '../../components/WTable'

export const useUserFeedbacksColumns =
  (): WTableProps<UserFeedback>['columns'] => {
    return [
      {
        accessorKey: 'comment',
      },
      {
        accessorKey: 'point',
        cellProps: { textAlign: 'center' },
        sortable: true,
      },
      {
        accessorKey: 'issueLink',
        transform: value => value && <Icon as={FaCheck} />,
        transformPDF: value => (value ? 'Yes' : '-'),
        cellProps: { textAlign: 'center' },
      },
      {
        accessorKey: 'processed',
        type: 'badge',
        transform: value => value && <Icon as={FaCheck} />,
        transformPDF: value => (value ? 'Yes' : '-'),
        cellProps: { textAlign: 'center' },
        sortable: true,
      },
      {
        accessorKey: 'createdAt',
        type: 'date',
        sortable: true,
      },
      {
        accessorKey: 'site',
      },
    ]
  }
