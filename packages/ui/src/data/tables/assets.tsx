import { useRouter } from 'next/router'

import { Asset, Platform, Profile } from '@fc/types'

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
    price: {},
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
