import { Donation } from '@fc/types'

import { WTableProps } from '../../components'

export const useDonationColumns = (): WTableProps<Donation>['columns'] => {
  return {
    email: { sortable: true },
    createdAt: {
      type: 'date',
      sortable: true,
    },
    status: {
      type: 'badge',
      componentProps: value => {
        return {
          variant: 'outline',
          colorScheme: (value as string) === 'paid' ? 'green' : 'yellow',
        }
      },
    },
    amount: {
      sortable: true,
      transform: value => `${(value as number).toFixed(2)} €`,
    },
  }
}
