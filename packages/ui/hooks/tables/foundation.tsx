import type { Foundation } from '@fc/types'

import { WTableProps } from '../../components/WTable'

export const useFoundationsColumns = (): WTableProps<Foundation>['columns'] => {
  return [
    { accessorKey: 'name', sortable: true },
    {
      accessorKey: 'email',
    },
    {
      accessorKey: 'bank1',
    },
    {
      accessorKey: 'IBAN1',
    },
    {
      accessorKey: 'bank2',
    },
    {
      accessorKey: 'IBAN2',
    },
    {
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
  ]
}
