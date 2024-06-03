import { Notification } from '@fc/types'

import { PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useNotificationColumns =
  (): WTableProps<Notification>['columns'] => {
    return {
      id: { sortable: true },
      title: { sortable: true },
      body: { sortable: true },
      publishedAt: {
        transform: value => (
          <PublicationBadges publishedAt={value as string | null} />
        ),
      },
    }
  }
