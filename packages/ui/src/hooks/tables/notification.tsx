import { Notification } from '@fc/types'

import { WTableProps } from '../../components'

export const useNotificationColumns =
  (): WTableProps<Notification>['columns'] => {
    return [
      { accessorKey: 'id', sortable: true },
      { accessorKey: 'title', sortable: true },
      { accessorKey: 'message', sortable: true },
    ]
  }
