import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import type { Category, Platform } from '@fc/types'

import { renderPublicationState } from './utils'
import { PublicationBadges } from '../../components/PublicationBadges'
import type { WTableProps } from '../../components/WTable'

export const useCategoryColumns = (): WTableProps<Category>['columns'] => {
  const { t } = useTranslation()
  const { locale } = useRouter()

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
    {
      accessorKey: 'platforms',
      transform: value => {
        const platforms = value as Platform[]

        return (
          platforms?.map(platform => platform[`name_${locale}`]).join(', ') ||
          '-'
        )
      },
    },
  ]
}
