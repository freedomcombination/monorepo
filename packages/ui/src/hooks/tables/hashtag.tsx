import { useRouter } from 'next/router'

import {
  ApprovalStatus,
  Hashtag,
  Mention,
  Platform,
  Post,
  StrapiLocale,
} from '@fc/types'

import { localeBadgesPDF, publicationBadgePDF } from './utils'
import { LocaleBadges, PublicationBadges, WTableProps } from '../../components'

export const useHashtagColumns = (): WTableProps<Hashtag>['columns'] => {
  const { locale } = useRouter()

  return {
    image: { type: 'image' },
    title: { sortable: true },
    platform: {
      sortable: true,
      transform: value => (value as Platform)?.[`name_${locale}`] || '',
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
      transformPDF: value => localeBadgesPDF(value as StrapiLocale[]),
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
  }
}
