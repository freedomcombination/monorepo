import { Activity, ApprovalStatus, StrapiLocale } from '@fc/types'

import {
  LocaleBadges,
  publicationBadgePDF,
  PublicationBadges,
  localeBadgesPDF,
} from '../../admin'
import { WTableProps } from '../../components'

export const useActivityColumns = (): WTableProps<Activity>['columns'] => {
  return {
    image: { type: 'image' },
    title: { sortable: true },
    description: {},
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
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
      transformPDF: value => localeBadgesPDF(value as StrapiLocale[]),
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
    date: {
      type: 'date',
      sortable: true,
    },
  }
}
