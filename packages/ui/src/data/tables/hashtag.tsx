import {
  ApprovalStatus,
  Hashtag,
  Mention,
  Post,
  Profile,
  StrapiLocale,
} from '@fc/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useHashtagColumns = (): WTableProps<Hashtag>['columns'] => {
  return {
    image: { type: 'image' },
    creator: {
      transform: value => (value as Profile)?.email,
      sortKey: 'email',
      sortable: true,
    },
    title: { sortable: true },
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
    createdAt: {
      type: 'date',
      sortable: true,
    },
    posts: {
      transform: value => (value as Post[])?.length,
    },
    mentions: {
      transform: value => (value as Mention[])?.length,
    },
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
  }
}
