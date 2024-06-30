import { Foundation } from '@fc/types'

import { WTableProps } from '../../components'

export const useFoundationsColumns = (): WTableProps<Foundation>['columns'] => {
  return {
    name: { sortable: true },
    email: {},
    bank1: {},
    IBAN1: {},
    bank2: {},
    IBAN2: {},
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
