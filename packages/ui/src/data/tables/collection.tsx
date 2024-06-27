import { ApprovalStatus, Art, Collection, StrapiLocale } from '@fc/types'

import { LocaleBadges, PublicationBadges } from '../../components'
import { WTableProps } from '../../components'

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
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
