import type { Notification } from '@fc/types'

import type { WTableProps } from '../../components/WTable'

export const useNotificationColumns =
  (): WTableProps<Notification>['columns'] => {
    return [
      { accessorKey: 'id', sortable: true },
      { accessorKey: 'title', sortable: true },
      { accessorKey: 'message', sortable: true },
    ]
  }
