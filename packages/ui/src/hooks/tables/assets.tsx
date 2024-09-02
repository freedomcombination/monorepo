import { useRouter } from 'next/router'

import { Asset, Platform, Profile } from '@fc/types'

import { WTableProps } from '../../components'

export const useAssetsColumns = (): WTableProps<Asset>['columns'] => {
  const { locale } = useRouter()

  return [
    { accessorKey: 'images', type: 'image' },
    { accessorKey: 'sku' },
    { accessorKey: 'name', sortable: true },
    {
      accessorKey: 'location',
      sortable: true,
    },
    {
      accessorKey: 'price',
    },
    {
      accessorKey: 'peopleInCharge',
      transform: value =>
        (value as Profile[])?.map(person => person.name).join(', ') || '-',
    },
    {
      accessorKey: 'platform',
      transform: value => (value as Platform)?.[`name_${locale}`] || '-',
    },
    {
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
  ]
}
