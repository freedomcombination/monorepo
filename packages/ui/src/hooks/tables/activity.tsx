import { Activity, ApprovalStatus, StrapiLocale } from '@fc/types'

import { localeBadgesPDF, publicationBadgePDF } from './utils'
import { LocaleBadges, PublicationBadges, WTableProps } from '../../components'

export const useActivityColumns = (): WTableProps<Activity>['columns'] => {
  return [
    { accessorKey: 'image', type: 'image' },
    { accessorKey: 'title', sortable: true },
    { accessorKey: 'description' },
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
      accessorKey: 'translates',
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
      transformPDF: value => localeBadgesPDF(value as StrapiLocale[]),
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
    {
      accessorKey: 'date',
      type: 'date',
      sortable: true,
    },
  ]
}
