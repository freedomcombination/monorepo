import { useRouter } from 'next/router'

import { ApprovalStatus, Art, Profile } from '@fc/types'

import { publicationBadgePDF } from './utils'
import { PublicationBadges, WTableProps } from '../../components'

export const useArtColumns = (): WTableProps<Art>['columns'] => {
  const { locale } = useRouter()

  return [
    {
      accessorKey: 'image',
      type: 'image',
    },
    {
      accessorKey: `title_${locale}`,
    },
    {
      accessorKey: `description_${locale}`,
    },
    {
      accessorKey: 'artist',
      transform: value => (value as Profile)?.email,
      sortKey: 'email',
      sortable: true,
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
