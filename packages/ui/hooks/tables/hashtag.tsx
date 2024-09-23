import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import type {
  ApprovalStatus,
  Hashtag,
  Mention,
  Platform,
  Post,
  StrapiLocale,
} from '@fc/types'

import { renderJoinedLocales, renderPublicationState } from './utils'
import { LocaleBadges } from '../../components/LocaleBadges'
import { PublicationBadges } from '../../components/PublicationBadges'
import type { WTableProps } from '../../components/WTable'

export const useHashtagColumns = (): WTableProps<Hashtag>['columns'] => {
  const { locale } = useRouter()
  const { t } = useTranslation()

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
      transformPDF: value => renderJoinedLocales(value as StrapiLocale[]),
    },
    {
      accessorKey: 'publishedAt',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => renderPublicationState(value as string | null, t),
    },
  ]
}
