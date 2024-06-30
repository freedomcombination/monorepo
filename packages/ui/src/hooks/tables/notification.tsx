import { Notification } from '@fc/types'

import { WTableProps } from '../../components'

export const useNotificationColumns =
  (): WTableProps<Notification>['columns'] => {
    return {
      id: { sortable: true },
      title: { sortable: true },
      message: { sortable: true },
    }
  }
