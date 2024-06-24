import { useRouter } from 'next/router'

import { ApprovalStatus, Art, Profile } from '@fc/types'

import { PublicationBadges, publicationBadgePDF } from '../../admin'
import { WTableProps } from '../../components'

export const useArtColumns = (): WTableProps<Art>['columns'] => {
  const { locale } = useRouter()

  return {
    image: { type: 'image' },
    [`title_${locale}`]: {},
    [`description_${locale}`]: {},
    artist: {
      transform: value => (value as Profile)?.email,
      sortKey: 'email',
      sortable: true,
    },
    approvalStatus: {
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
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
