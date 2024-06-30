import { Icon } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'

import { UserFeedback } from '@fc/types'

import { WTableProps } from '../../components/WTable'

export const useUserFeedbacksColumns =
  (): WTableProps<UserFeedback>['columns'] => {
    return {
      comment: {},
      point: {
        cellProps: { textAlign: 'center' },
        sortable: true,
      },
      issueLink: {
        transform: value => value && <Icon as={FaCheck} />,
        transformPDF: value => (value ? 'Yes' : '-'),
        cellProps: { textAlign: 'center' },
      },
      processed: {
        type: 'badge',
        transform: value => value && <Icon as={FaCheck} />,
        transformPDF: value => (value ? 'Yes' : '-'),
        cellProps: { textAlign: 'center' },
        sortable: true,
      },
      createdAt: {
        type: 'date',
        sortable: true,
      },
      site: {},
    }
  }
