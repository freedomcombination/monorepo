import type { Profile, Team } from '@fc/types'

import type { WTableProps } from '../../components/WTable'

export const useTeamColumns = (): WTableProps<Team>['columns'] => {
  return [
    {
      accessorKey: 'name',
      sortable: true,
    },
    {
      accessorKey: 'description',
      sortable: true,
    },
    {
      accessorKey: 'lead',
      transform: value => (value as Profile)?.name,
      sortable: true,
      sortKey: 'type',
    },
    {
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
  ]
}
