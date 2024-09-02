import { ApprovalStatus, Blog, Profile } from '@fc/types'

import { publicationBadgePDF } from './utils'
import { PublicationBadges, WTableProps } from '../../components'

export const useBlogColumns = (): WTableProps<Blog>['columns'] => {
  return [
    { accessorKey: 'image', type: 'image' },
    {
      accessorKey: 'author',
      transform: value => (value as Profile)?.email,
      sortKey: 'email',
      sortable: true,
    },
    { accessorKey: 'title', sortable: true },
    {
      accessorKey: 'description',
    },
    {
      accessorKey: 'approvalStatus',
      type: 'badge',
      componentProps: value => {
        const colorScheme = {
          approved: 'green',
          pending: 'yellow',
          rejected: 'red',
        }

        return {
          variant: 'outline',
          colorScheme: colorScheme[value as ApprovalStatus],
        }
      },
    },
    {
      accessorKey: 'publishedAt',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
    {
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
  ]
}
