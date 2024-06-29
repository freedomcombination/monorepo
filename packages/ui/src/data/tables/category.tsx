import { Category } from '@fc/types'

import { PublicationBadges, WTableProps } from '../../components'
import { publicationBadgePDF } from './utils'

export const useCategoryColumns = (): WTableProps<Category>['columns'] => {
  return {
    id: { sortable: true },
    slug: { sortable: true },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
  }
}
