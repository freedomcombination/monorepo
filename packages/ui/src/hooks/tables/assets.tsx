import { useRouter } from 'next/router'

import { Asset, Platform, Profile } from '@fc/types'
import { formatPrice } from '@fc/utils'

import { WTableProps } from '../../components'

export const useAssetsColumns = (): WTableProps<Asset>['columns'] => {
  const { locale } = useRouter()

  return {
    images: { type: 'image' },
    sku: {},
    name: { sortable: true },
    location: {
      sortable: true,
    },
    price: {
      transform: value => formatPrice(value as number, 1),
    },
    peopleInCharge: {
      transform: value =>
        (value as Profile[])?.map(person => person.name).join(', ') || '-',
    },
    platform: {
      transform: value => (value as Platform)?.[`name_${locale}`] || '-',
    },
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
