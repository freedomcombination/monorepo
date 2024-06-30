import { AssetsTracking, Profile } from '@fc/types'

import { WTableProps } from '../../components'

export const useAssetsTrackingsColumns =
  (): WTableProps<AssetsTracking>['columns'] => {
    return {
      fromLocation: {},
      toLocation: {},
      date: {
        type: 'date',
        sortable: true,
      },
      assignedTo: {
        transform: value => {
          const profile = value as Profile

          return profile?.name || profile?.email
        },
      },
      createdAt: {
        type: 'date',
        sortable: true,
      },
    }
  }
