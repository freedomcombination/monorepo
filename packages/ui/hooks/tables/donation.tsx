import type { Donation } from '@fc/types'

import { WTableProps } from '../../components/WTable'

export const useDonationColumns = (): WTableProps<Donation>['columns'] => {
  return [
    { accessorKey: 'email', sortable: true },
    {
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
    {
      accessorKey: 'status',
      type: 'badge',
      componentProps: value => {
        return {
          variant: 'outline',
          colorScheme: (value as string) === 'paid' ? 'green' : 'yellow',
        }
      },
    },
    {
      accessorKey: 'amount',
      sortable: true,
      transform: value => `${(value as number).toFixed(2)} €`,
    },
  ]
}
