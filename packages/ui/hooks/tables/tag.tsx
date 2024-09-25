import { useTranslation } from 'react-i18next'

import type { Tag } from '@fc/types'

import { renderPublicationState } from './utils'
import { PublicationBadges } from '../../components/PublicationBadges'
import { WTableProps } from '../../components/WTable'

export const useTagColumns = (): WTableProps<Tag>['columns'] => {
  const { t } = useTranslation()

  return [
    {
      accessorKey: 'id',
      sortable: true,
    },
    {
      accessorKey: 'slug',
      sortable: true,
    },
    {
      accessorKey: 'name_en',
      sortable: true,
    },
    {
      accessorKey: 'name_nl',
      sortable: true,
    },
    {
      accessorKey: 'name_tr',
      sortable: true,
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
