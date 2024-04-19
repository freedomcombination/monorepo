import { Hashtag, Post, StrapiLocale, ApprovalStatus, Profile } from '@fc/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const usePostColumns = (): WTableProps<Post>['columns'] => {
  return {
    image: { type: 'image' },
    creator: {
      transform: value => (value as Profile)?.email,
      sortKey: 'email',
      sortable: true,
    },
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
