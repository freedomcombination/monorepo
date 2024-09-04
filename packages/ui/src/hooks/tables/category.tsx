import { useTranslation } from 'next-i18next'

import { Category } from '@fc/types'

import { renderPublicationState } from './utils'
import { PublicationBadges, WTableProps } from '../../components'

export const useCategoryColumns = (): WTableProps<Category>['columns'] => {
  const { t } = useTranslation()

  return [
    { accessorKey: 'id', sortable: true },
    { accessorKey: 'slug', sortable: true },
    {
      accessorKey: 'publishedAt',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => renderPublicationState(value as string | null, t),
    },
  ]
}
