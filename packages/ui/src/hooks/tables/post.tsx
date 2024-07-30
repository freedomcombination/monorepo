import { ApprovalStatus, Hashtag, Post, StrapiLocale } from '@fc/types'

import { localeBadgesPDF, publicationBadgePDF } from './utils'
import { LocaleBadges, PublicationBadges, WTableProps } from '../../components'

export const usePostColumns = (): WTableProps<Post>['columns'] => {
  return {
    image: { type: 'image' },
    hashtag: {
      sortable: true,
      transform: value => (value as Hashtag)?.title,
    },
    createdAt: {
      type: 'date',
      sortable: true,
    },
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
      transformPDF: value => localeBadgesPDF(value as StrapiLocale[]),
    },
    approvalStatus: {
      type: 'badge',
      componentProps: value => {
        const colorPalette = {
          approved: 'green',
          pending: 'yellow',
          rejected: 'red',
        }

        return {
          variant: 'outline',
          colorPalette: colorPalette[value as ApprovalStatus],
        }
      },
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
  }
}
