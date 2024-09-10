import { useTranslation } from 'next-i18next'

import { ApprovalStatus, Art, Collection, StrapiLocale } from '@fc/types'

import { renderJoinedLocales, renderPublicationState } from './utils'
import { LocaleBadges, PublicationBadges, WTableProps } from '../../components'

export const useCollectionColumns = (): WTableProps<Collection>['columns'] => {
  const { t } = useTranslation()

  return [
    { accessorKey: 'image', type: 'image' },
    { accessorKey: 'title', sortable: true },
    { accessorKey: 'slug', label: 'Slug' },
    {
      accessorKey: 'description',
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
      accessorKey: 'arts',
      transform: value => (value as Art[])?.length,
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
    {
      accessorKey: 'createdAt',
      type: 'date',
      sortable: true,
    },
  ]
}
