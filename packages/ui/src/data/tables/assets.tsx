import { Asset } from '@fc/types'

import { WTableProps } from '../../components'

export const useAssetsColumns = (): WTableProps<Asset>['columns'] => {
  return {
    images: { type: 'image' },
    sku: {},
    name: { sortable: true },
    location: {},
    price: {},
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
