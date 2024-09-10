import { useTranslation } from 'react-i18next'

import { ApprovalStatus, Hashtag, Post, StrapiLocale } from '@fc/types'

import { renderJoinedLocales, renderPublicationState } from './utils'
import { LocaleBadges, PublicationBadges, WTableProps } from '../../components'

export const usePostColumns = (): WTableProps<Post>['columns'] => {
  const { t } = useTranslation()

  return [
    {
      accessorKey: 'image',
      type: 'image',
    },
    {
      accessorKey: 'hashtag',
      sortable: true,
      transform: value => (value as Hashtag)?.title,
    },
    {
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
    {
      accessorKey: 'translates',
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
      transformPDF: value => renderJoinedLocales(value as StrapiLocale[]),
    },
    {
      accessorKey: 'approvalStatus',
      type: 'badge',
      componentProps: value => {
        const colorPalettes = {
          approved: 'green',
          pending: 'yellow',
          rejected: 'red',
        }

        return {
          variant: 'outline',
          colorPalette: colorPalettes[value as ApprovalStatus],
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
  ]
}
