import { ApprovalStatus, Art, Collection, StrapiLocale } from '@fc/types'

import { localeBadgesPDF, publicationBadgePDF } from './utils'
import { LocaleBadges, PublicationBadges, WTableProps } from '../../components'

export const useCollectionColumns = (): WTableProps<Collection>['columns'] => {
  return {
    image: { type: 'image' },
    title: { sortable: true },
    slug: { label: 'Slug' },
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
    arts: { transform: value => (value as Art[])?.length },
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
  }
}
