import { useTranslation } from 'next-i18next'

import type { ApprovalStatus, Blog, Profile } from '@fc/types'

import { renderPublicationState } from './utils'
import { PublicationBadges } from '../../components/PublicationBadges'
import type { WTableProps } from '../../components/WTable'

export const useBlogColumns = (): WTableProps<Blog>['columns'] => {
  const { t } = useTranslation()

  return [
    { accessorKey: 'image', type: 'image' },
    {
      accessorKey: 'author',
      transform: value => (value as Profile)?.email,
      sortKey: 'email',
      sortable: true,
    },
    { accessorKey: 'title', sortable: true },
    {
      accessorKey: 'description',
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
      accessorKey: 'publishedAt',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => renderPublicationState(value as string | null, t),
    },
    {
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
  ]
}
