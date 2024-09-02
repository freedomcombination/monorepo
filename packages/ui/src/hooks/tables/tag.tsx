import { Tag } from '@fc/types'

import { publicationBadgePDF } from './utils'
import { PublicationBadges, WTableProps } from '../../components'

export const useTagColumns = (): WTableProps<Tag>['columns'] => {
  return [
    {
      accessorKey: 'id',
      sortable: true,
    },
    {
      accessorKey: 'slug',
      sortable: true,
    },
    {
      accessorKey: 'name_en',
      sortable: true,
    },
    {
      accessorKey: 'name_nl',
      sortable: true,
    },
    {
      accessorKey: 'name_tr',
      sortable: true,
    },
    {
      accessorKey: 'publishedAt',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
  ]
}
