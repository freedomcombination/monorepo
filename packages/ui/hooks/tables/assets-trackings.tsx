import type { AssetsTracking, Profile } from '@fc/types'

import { WTableProps } from '../../components/WTable'

export const useAssetsTrackingsColumns =
  (): WTableProps<AssetsTracking>['columns'] => {
    return [
      {
        accessorKey: 'fromLocation',
      },
      {
        accessorKey: 'toLocation',
      },
      {
        accessorKey: 'date',
        type: 'date',
        sortable: true,
      },
      {
        accessorKey: 'assignedTo',
        transform: value => {
          const profile = value as Profile

          return profile?.name || profile?.email
        },
      },
      {
        accessorKey: 'createdAt',
        type: 'date',
        sortable: true,
      },
    ]
  }
