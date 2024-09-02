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

  return [
    { accessorKey: 'image', type: 'image' },
    {
      accessorKey: 'title',
      sortable: true,
    },
    {
      accessorKey: 'platform',
      sortable: true,
      transform: value => (value as Platform)?.[`name_${locale}`] || '',
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
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
    {
      accessorKey: 'posts',
      transform: value => (value as Post[])?.length,
    },
    {
      accessorKey: 'mentions',
      transform: value => (value as Mention[])?.length,
    },
    {
      accessorKey: 'translates',
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
      transformPDF: value => localeBadgesPDF(value as StrapiLocale[]),
    },
    {
      accessorKey: 'publishedAt',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
  ]
}
