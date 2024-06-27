import { ApprovalStatus, Hashtag, Post, StrapiLocale } from '@fc/types'

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
    },
  }
}
